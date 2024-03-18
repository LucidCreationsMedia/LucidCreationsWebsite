import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import SignInButton from "./buttons/SignInButton";
import { signIn } from "next-auth/react";

interface EmailFormProps {
  provider: string;
  id: string;
  signIn?: typeof signIn;
}

/**
 * The email singin form. Will validate the email provided and invoke
 * the singin function on submit.
 * @param {string} provider the provider name from Next-Auth.
 * @param {string} id the provider id from Next-Auth.
 * @param sigin the signin function form Next-Auth.
 * @returns the email sigin form.
 */

const EmailForm = ({ provider, id, signIn }: EmailFormProps): JSX.Element => {
  // Form field valid statuses.
  const [validEmail, setValidEmail] = useState<boolean>(false);

  // Email validation
  const validateEmail = (
    inputEmail: string | undefined
  ): string | undefined => {
    let emailError;

    if (!inputEmail) {
      emailError = "Email is required.";
      setValidEmail(false);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(inputEmail)) {
      emailError = "Invalid email format.";
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
    return emailError;
  };

  // Entire form valid
  const [validForm, setValidForm] = useState<boolean>(false);

  // Validate the fields on change.
  useEffect(() => {
    if (!validEmail) {
      setValidForm(false);
    }

    if (validEmail) {
      setValidForm(true);
    }
  }, [validEmail]);

  const handleSubmit = (form: { email: string }) => {
    signIn("email", form);
  };

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
        email: ""
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(props) => (
        <Form
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <VStack h="auto" w="100%" spacing={6}>
            <Field name="email" validate={validateEmail}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    form.errors.email && form.touched.email ? true : false
                  }
                >
                  <HStack
                    h="auto"
                    w="100%"
                    spacing={0}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormLabel fontSize="xl" mr="3rem" htmlFor="email">
                      {"Email"}
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
                        type="email"
                        id="email"
                        name="email"
                        placeholder="support@lucidcreations.media"
                        isDisabled={form.isSubmitting}
                        {...(!form.errors.email && form.touched.email
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
                        {typeof form.errors.email === "string"
                          ? form.errors.email
                          : ""}
                      </FormErrorMessage>
                    </VStack>
                  </HStack>
                </FormControl>
              )}
            </Field>
            <VStack h="auto" w="100%" spacing={4}>
              <SignInButton
                id={id}
                provider={provider}
                validForm={validForm}
                isSubmitting={props.isSubmitting}
              />
            </VStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
