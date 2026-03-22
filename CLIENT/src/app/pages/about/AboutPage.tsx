import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import {
  useLazyGetError400Query,
  useLazyGetError401Query,
  useLazyGetError404Query,
  useLazyGetError500Query,
  useLazyGetValidationErrorQuery,
} from "../../api/errorApi";

export default function AboutPage() {
  const [trigger404Error] = useLazyGetError404Query();
  const [trigger400Error] = useLazyGetError400Query();
  const [trigger401Error] = useLazyGetError401Query();
  const [trigger500Error] = useLazyGetError500Query();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h3">
        Error for testing
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => trigger404Error().catch((err) => console.log(err))}
        >
          Test 404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger400Error().catch((err) => console.log(err))}
        >
          Test 400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger401Error().catch((err) => console.log(err))}
        >
          Test 401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger500Error().catch((err) => console.log(err))}
        >
          Test 500 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            triggerValidationError().catch((err) => console.log(err))
          }
        >
          Test Validation Error
        </Button>
      </ButtonGroup>
    </Container>
  );
}
