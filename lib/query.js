export const BOOK_QUERY = `query{
    books{
      data{
        attributes{
          title
          slug
          price
          genre
          image{
            data{
              attributes{
              url
              }
            }
          }
        }
      }
    }
  }
  `;

export const GET_BOOK_QUERY = `
query getBooks($slug:String!){
  books(filters: {slug :{eq: $slug}}){
    data{
      attributes{
        title
        slug
        price
        original_price
        genre
        seller{ data { attributes { uid, name } } }
        image{
          data{
            attributes{
              url
            }
          }
        }
      }
    }
  }
}
`;

export const GET_SELLERS_QUERY = `
query getSellers($uid:String!){
  sellers(filters: {uid :{eq: $uid}}){
    data{
    id,
      attributes{
        uid,
        name,
        email,
        picture,
        table,
        phone,
        country,
        address
      }
    }
  }
}`;