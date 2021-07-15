import Vue from "vue";
import recordsApi from "@/api/records";
import {Record, RecordWithMeta} from "@/models";

const QUERY = {
    all: 'all',
    preview: 'preview',
    starred: 'starred'
}
const state = {
    records: [],
    limit: 12,
    offset: 0,
    query: QUERY.all,
    // TODO: move to navigation store?
    enableInfiniteScroll: false
};
const getters = {};
const mutations = {
    disableInfiniteScroll(state) {
        state.enableInfiniteScroll = false;
    },
    enableInfiniteScroll(state) {
        state.enableInfiniteScroll = true;
    },
    increaseOffset(state) {
        state.offset += state.limit;
    },
    extendRecords(state, payload) {
        state.records = state.records.concat(payload.records);
    },
    resetRecords(state) {
        state.records = [];
    },
    resetOffset(state) {
        state.offset = 0;
    },
    changeRecord(state, payload) {
        Vue.set(
            state.records,
            state.records.findIndex(r => r.id === payload.id),
            payload
        );
    },
    setQuery(state, payload) {
        state.query = payload;
    }
};
const actions = {
    loadRecordsPreview({commit}, sourceId) {
        return new Promise((resolve, reject) => {
            recordsApi.getRecordsPreview({
                sourceId
            })
                .then(response => {
                    let records = response.getRecordsList().map(Record.fromPb);

                    commit("resetRecords");
                    commit("extendRecords", {
                        records: records
                    });

                    if (records.length === 0) {
                        commit("disableInfiniteScroll");
                    }
                    setTimeout(() => commit("enableInfiniteScroll"), 1000);
                    resolve();
                })
                .catch(reject);
        });
    },

    setQuery( { commit },  query ) {
        commit("setQuery", query)
    },

    loadRecords(
        {commit, state},
        {sourceId = null, replace = true}
    ) {
        if (replace) {
            commit("resetOffset");
        }
        return new Promise((resolve, reject) => {
            recordsApi.getRecords({
                limit: state.limit,
                offset: state.offset,
                query: state.query,
                sourceId
            })
                .then(response => {
                    let records = response.getRecordsList().map(RecordWithMeta.fromPb);
                    if (replace) {
                        commit("resetRecords");
                    }
                    commit("increaseOffset");

                    commit("extendRecords", {
                        records: records
                    });
                    if (records.length === 0) {
                        commit("disableInfiniteScroll");
                        this.enableInfiniteScroll = false;
                    }
                    setTimeout(() => commit("enableInfiniteScroll"), 1000);
                    resolve();
                })
                .catch(reject);
        });
    },

    toggleStarred({commit}, {recordId, starred}) {
        recordsApi.toggleStarred(recordId, starred).then(response => {
            commit("changeRecord", RecordWithMeta.fromPb(response.getRecord()));
        });
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
