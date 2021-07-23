from concurrent import futures
import grpc
import embedding_pb2_grpc
import embedding_pb2
from sentence_transformers import SentenceTransformer, util
# import nmslib
model = SentenceTransformer('paraphrase-mpnet-base-v2')

class EmbedServicer(embedding_pb2_grpc.EmbederServicer):
  def Embed(self, request, context):

      feature = model.encode(request.value)
      return embedding_pb2.EmbedReply(embedding=feature)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    embedding_pb2_grpc.add_EmbederServicer_to_server(
      EmbedServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()
