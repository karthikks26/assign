import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import useNewsStore from "../store/useNewsStore";
import CustomPagination from "./CustomPagination";
import { useState, useEffect } from "react";

const NewsList = () => {
  const { newsData, loading, error, category, searchTerm, fetchNewsData } =
    useNewsStore((state) => ({
      newsData: state.newsData,
      loading: state.loading,
      error: state.error,
      category: state.category,
      searchTerm: state.searchTerm,
      fetchNewsData: state.fetchNewsData,
    }));

  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchNewsData(category, searchTerm);
  }, [category, searchTerm, fetchNewsData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalArticles = newsData?.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = newsData?.slice(startIndex, endIndex);

  return (
    <Container>
      <Row>
        {currentArticles?.map((article) => (
          <Col xs={12} md={6} lg={4} key={article.url}>
            {" "}
            {/* Use a unique key */}
            <Card>
              <Card.Img src={article.image} variant="top" />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                {/* Use the article's URL or another unique identifier */}
                <Link to={`/article/${encodeURIComponent(article.url)}`}>
                  Read More
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default NewsList;
