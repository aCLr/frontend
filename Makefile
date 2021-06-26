gen-proto:
	protoc -I /home/anton/Projects/feeder/interface/proto/ \
		records.proto \
		sources.proto \
		users.proto \
		--js_out=import_style=commonjs:/home/anton/Projects/feedr/frontend/src/pb \
		--grpc-web_out=import_style=commonjs,mode=grpcwebtext:/home/anton/Projects/feedr/frontend/src/pb