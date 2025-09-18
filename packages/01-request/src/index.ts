import fastify from 'fastify'

const server = fastify()

server.get('/ping', async (_request, _reply) => {
  return 'pong\n'
})

const putSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  body: {
    type: 'object',
    required: ['title', 'body', 'author'],
    properties: {
      title: { type: 'string', maxLength: 100 },
      body: { type: 'string', maxLength: 1000 },
      author: { type: 'string', maxLength: 20 }
    }
  }
}

server.put('/posts/:id', { schema: putSchema }, async (request, _reply) => {
  const { id } = request.params as { id: string }
  const { title, body, author } = request.body as { title: string; body: string; author: string }
  return { message: 'Post updated successfully', data: { id, title, body, author } }
})

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
