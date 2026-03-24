import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import {
  useLazyGetError400Query,
  useLazyGetError401Query,
  useLazyGetError404Query,
  useLazyGetError500Query,
  useLazyGetValidationErrorQuery,
} from "../../api/errorApi";
import { useState } from "react";

export default function AboutPage() {
  const [validationError, setValidationError] = useState<string[]>([]);

  const [trigger404Error] = useLazyGetError404Query();
  const [trigger400Error] = useLazyGetError400Query();
  const [trigger401Error] = useLazyGetError401Query();
  const [trigger500Error] = useLazyGetError500Query();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  const getValdationError = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string"
      ) {
        const errorArray = (error as { message: string }).message.split(", ");
        setValidationError(errorArray);
      }
    }
  };

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
        <Button variant="contained" onClick={getValdationError}>
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationError.length > 0 && (
        <Alert severity="error">
          <AlertTitle> Validation Error</AlertTitle>
          <List>
            {validationError.map((err) => (
              <ListItem key={err}>{err}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
