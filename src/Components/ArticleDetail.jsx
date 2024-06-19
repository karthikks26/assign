import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import useNewsStore from "../store/useNewsStore";

const ArticleDetail = () => {
  const { id } = useParams();
  const { newsData } = useNewsStore((state) => ({
    newsData: state.newsData,
  }));

  // Decode the URL-encoded ID
  const decodedId = decodeURIComponent(id);
  const article = newsData.find((article) => article.url === decodedId);

  const navigate = useNavigate();

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <Container className="mt-4">
      <Button variant="primary" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Card className="mt-4">
        <Card.Img variant="top" src={article.image} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.content}</Card.Text>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read Full Article
          </a>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ArticleDetail;
