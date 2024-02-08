import { useContext } from 'react';
import { Userinfo, userContext } from './UserContextProvider';
import { Container } from 'react-bootstrap';

function Home() {
  const { currentUserinfo }: { currentUserinfo: Userinfo } =
    useContext(userContext);

  return (
    <Container
      fluid
      className="py-4 my-4 border border-2 rounded-3 text-center"
    >
      <h1>Welcome {currentUserinfo.name}</h1>
      <hr />
      <Container
        fluid
        className="py-4 my-4 border border-2 rounded-3 text-start"
      >
        <div>Top Business Books</div>
      </Container>
      <Container
        fluid
        className="py-4 my-4 border border-2 rounded-3 text-start"
      >
        <div>Top Education Books</div>
      </Container>
      <Container
        fluid
        className="py-4 my-4 border border-2 rounded-3 text-start"
      >
        <div>Top Food and Fitness Books</div>
      </Container>
      <Container
        fluid
        className="py-4 my-4 border border-2 rounded-3 text-start"
      >
        <div>Top Science Books</div>
      </Container>
    </Container>
  );
}

export default Home;
