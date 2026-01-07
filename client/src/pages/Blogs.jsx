import React from "react";
import styled from "styled-components";
import EmptyState from "../components/ui/EmptyState";

const Container = styled.div`
  flex: 1;
`;

const Blogs = () => {
  return (
    <Container>
      <EmptyState
        icon="📝"
        title="Fitness Blogs"
        message="Expert fitness blogs are coming soon."
      />
    </Container>
  );
};

export default Blogs;
