import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

function HomePage({ AllBoardsQuery }) {
   if (AllBoardsQuery.loading) {
      return <div>Loading</div>;
 }

   if (AllBoardsQuery.error) {
      console.error(AllBoardsQuery.error.stack);
      return <div>Error</div>;
  }

   return (
      <div>
         <h1>Boards</h1>
         <ul>
            {AllBoardsQuery.allBoards.map(board => (
               <li key={board.id}>
                  name={board.name}
               </li>
            ))}
         </ul>
      </div>
   );
}

const ALL_BOARDS_QUERY = gql`
query AllBoardsQuery {
   allBoards(orderBy: updatedAt_DESC) {
      id
      name
   }
}
`

export default graphql(ALL_BOARDS_QUERY, {name: 'AllBoardsQuery'}) (HomePage);
