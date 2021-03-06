export default (state = [], action) => {
  let index;
  let quote;

  switch (action.type) {

    case 'ADD_QUOTE':
      return [...state, { id: action.quote.id, content: action.quote.content, author: action.quote.author, votes: action.quote.votes }];

    case 'REMOVE_QUOTE':
      return state.filter(quote => quote.id !== action.quoteId);

    case 'UPVOTE_QUOTE':
      index = state.findIndex(quote => quote.id === action.quoteId);
      quote = state[index];

      return [
        ...state.slice(0, index),
        Object.assign({}, quote, { votes: quote.votes += 1 }),
        ...state.slice(index + 1)
      ];

    case 'DOWNVOTE_QUOTE':
      index = state.findIndex(quote => quote.id === action.quoteId);
      quote = state[index];
      if (quote.votes > 0) {
        return [
          ...state.slice(0, index),
          Object.assign({}, quote, { votes: quote.votes -= 1 }),
          ...state.slice(index + 1)
        ];
      }
      return state;

    default: 
      return state;
  }
}
