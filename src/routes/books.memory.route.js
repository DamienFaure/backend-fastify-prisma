
const books = [];

async function booksMemoryRoute(fastify, options) {

  fastify.get('/', async (request, reply) => {
    //  ⚙️🔥 write your code here
    reply.code(404).send({ error: 'Not implemented' });
  });

  const getBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  };

  fastify.get('/:id', { schema: getBookSchema }, async (request, reply) => {
    //  ⚙️🔥 write your code here ⚙️🔥
    const { id } = request.params;
    const book = books.find(b => b.id === id);
  });

  const createBookSchema = {
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
  };

  fastify.post('/', { schema: createBookSchema }, async (request, reply) => {
    //  ⚙️🔥 write your code here ⚙️🔥
    // etape 1: je récupère de request le contenu du livre
    // etape 2: je construis un nouvel objet {id: ??, title: ??, author: ??}
    // etape 3: je l'ajoute à books
    // etape 4: je retourne le livre créé
    const {title, author} = request.body;
    const new_book = {title, author, id: books.length};
    books.push(new_book);
    return reply.code(201).send(new_book);
  });

  const updateBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
  };

  fastify.put('/:id', { schema: updateBookSchema }, async (request, reply) => {
    //  ⚙️🔥 write your code here ⚙️🔥
    const { id } = request.params;
    const { title, author } = request.body;
    const book = books.find(b => b.id === id);
    if (!book) {
      return reply.code(404).send({ error: 'Book not found' });
    }
    book.title = title;
    book.author = author;
    return reply.code(200).send(book);
  });

  const deleteBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  };
  fastify.delete('/:id', { schema: deleteBookSchema }, async (request, reply) => {
    //  ⚙️🔥 write your code here ⚙️🔥
    const { id } = request.params;
    const book = books.find(b => b.id === id);
    if (!book) {
      return reply.code(404).send({ error: 'Book not found' });
    }
  });
}

export default booksMemoryRoute;