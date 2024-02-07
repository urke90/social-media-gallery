/**
 * USER
 */

export const userQuery = (userId = '') => {
  return `*[_type == "user" && _id == '${userId}']`;
};

/**
 * POSTS
 */
export const POSTS_QUERY = `*[_type == "post"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;

export const postDetailQuery = (postId = '') => {
  return `*[_type == "post" && _id == '${postId}']{
          image{
            asset->{
              url
            }
          },
          _id,
          title, 
          about,
          category,
          destination,
          postedBy->{
            _id,
            userName,
            image
          },
         save[]{
            postedBy->{
              _id,
              userName,
              image
            },
          },
          comments[]{
            comment,
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          }
        }`;
};

export const categoryQuery = (category = '') => {
  const query = `*[_type == "post" && title match '${category}*' || category match '${category}*' || about match '${category}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                userName,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            }`;
  return query;
};

export const userCreatedPostsQuery = (userId = '') => {
  const query = `*[_type == 'post' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};

export const userSavedPostsQuery = (userId = '') => {
  const query = `*[_type == 'post' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};
