import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";

interface ManualAccountActivationFormProps {
  activate?: (activationToken: string) => void;
}

/**
 * A form that will take in and validate an account activation token.
 * Provided to the users if automatic activation fails.
 * @param activate the activation function to be invoked on submit.
 * @returns the form for users to manually activate their account
 * using their activation token sent to their email.
 */

const ManualAccountActivationForm = ({
  activate
}: ManualAccountActivationFormProps): JSX.Element => {
  // Form field valid statuses.
  const [validToken, setValidToken] = useState<boolean>(false);

  // Token Validation
  const validateToken = (token: string): string | undefined => {
    if (!token) {
      setValidToken(false);
      return "You must provide a token.";
    }

    if (token.length === 0) {
      setValidToken(false);
      return "You must provide a token.";
    }

    if (token[0] !== "c") {
      setValidToken(false);
      return "Tokens start with a c.";
    }

    if (token.length < 25) {
      setValidToken(false);
      return "Tokens are at least 25 characters in length.";
    }

    setValidToken(true);
    return undefined;
  };

  // Entire form valid
  const [validForm, setValidForm] = useState<boolean>(false);

  // Validate the fields on change.
  useEffect(() => {
    if (!validToken) {
      setValidForm(false);
    }

    if (validToken) {
      setValidForm(true);
    }
  }, [validToken]);

  // Field theme
  const fieldTheme = {
    width: "100%",
    bg: "gray.900",
    borderColor: "white",
    _placeholder: {
      color: "white"
    },
    _focus: {
      bg: "#000",
      color: "#FFF",
      borderColor: "#63b3ed",
      boxShadow: "0 0 0 1px #63b3ed",
      zIndex: "1"
    }
  };

  return (
    <Formik
      initialValues={{
        token: ""
      }}
      onSubmit={(values) => {
        activate(values.token);
      }}
    >
      {(props) => (
        <Form
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <VStack
            h="auto"
            w="100%"
            spacing={4}
            justifyContent="center"
            alignItems="flex-start"
          >
            <Field name="token" validate={validateToken}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    form.errors.token && form.touched.token ? true : false
                  }
                >
                  <HStack
                    h="auto"
                    w="100%"
                    spacing={0}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormLabel fontSize="xl" w="11rem" htmlFor="token">
                      {"Activation Token"}
                    </FormLabel>
                    <VStack
                      h="auto"
                      w="100%"
                      spacing={4}
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Input
                        required
                        {...fieldTheme}
                        {...field}
                        type="token"
                        id="token"
                        name="token"
                        placeholder="cl70m9...."
                        isDisabled={form.isSubmitting}
                        {...(!form.errors.token && form.touched.token
                          ? {
                              borderColor: "brand.valid",
                              boxShadow: "0 0 0 1px #00c17c",
                              _hover: {
                                borderColor: "brand.valid",
                                boxShadow: "0 0 0 1px #00c17c"
                              }
                            }
                          : "")}
                      />
                      <FormErrorMessage>
                        {typeof form.errors.token === "string"
                          ? form.errors.token
                          : ""}
                      </FormErrorMessage>
                    </VStack>
                  </HStack>
                </FormControl>
              )}
            </Field>
            <VStack
              h="auto"
              w="100%"
              justifyContent="center"
              alignContent="center"
            >
              <Button
                type="submit"
                variant="submit"
                isDisabled={!validForm}
                isLoading={props.isSubmitting}
              >
                {"Activate Your Account"}
              </Button>
              {/* <Button
                type="button"
                variant="submit"
                isLoading={props.isSubmitting}
                onClick={() => {}}
              >
                {"Resend Activation Key"}
              </Button> */}
            </VStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default ManualAccountActivationForm;
