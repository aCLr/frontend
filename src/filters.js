import Vue from "vue";
import luxon from "luxon";

Vue.filter("fromNow", function(value) {
  luxon;
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});
