import React from "react";
import styled from "styled-components";
import EmptyState from "../components/ui/EmptyState";

const Container = styled.div`
  flex: 1;
`;

const Tutorials = () => {
  return (
    <Container>
      <EmptyState
        icon="📹"
        title="Workout Tutorials"
        message="Video tutorials will be added soon. Stay fit!"
      />
    </Container>
  );
};

export default Tutorials;
