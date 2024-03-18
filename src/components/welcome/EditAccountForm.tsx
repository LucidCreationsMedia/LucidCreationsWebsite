/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { updateProfile } from "../../features/profile";
import {
  VStack,
  FormControl,
  HStack,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Textarea,
  Heading,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  InputLeftAddon
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import editUserProfile from "../../../lib/api/mutation/profile/editUserProfile";
import checkUsernameAvailible from "../../../lib/profile/checkUsernameAvailible";
import { generateUsername } from "../../../lib/profile/generateProfile";
import { Icon } from "@iconify/react";

interface EditAccountProps {
  userId: string;
  name?: string;
  username?: string;
  bio?: string;
  loading: boolean;
}

/**
 * The form for editing the user's account information.
 * @param {string} userId the user id from the session.
 * @param {string} name the user's name from the session.
 * @param {string} username the username id from the session.
 * @param {string} bio the user's bio from the session.
 * @param {boolean} loading is tha data being fetched from the session?
 * @param {Role} role the role of the user.
 */

const EditAccountForm = ({
  userId,
  name,
  username,
  bio
}: // loading
EditAccountProps): JSX.Element => {
  // TODO: Make hstacks for mobile responsiveness.
  const dispatch = useAppDispatch();

  // Form field valid statuses.
  const [validName, setValidName] = useState<boolean>(false);
  const [validUsername, setValidUsername] = useState<boolean>(false);
  const [validBio, setValidBio] = useState<boolean>(false);
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);
  const [checkingUsername, setCheckingUsername] = useState<boolean>(false);

  const validateName = (newName: string): string | undefined => {
    let errorMessage;

    if (!newName) {
      errorMessage = "Please enter a name.";
      setValidName(false);
    } else if (newName === "") {
      errorMessage = "Please enter a name.";
      setValidName(false);
    } else if (newName.length < 5 || newName.length > 25) {
      errorMessage = "Name must be between 5 and 25 characters.";
      setValidName(false);
    } else {
      setValidName(true);
    }
    return errorMessage;
  };

  const generateSuggestedUsernames = async (
    username: string
  ): Promise<string[]> => {
    const suggestions: string[] = [];
    setCheckingUsername(true);

    // Reset the suggested username array if it exists.
    if (usernameSuggestions.length) {
      setUsernameSuggestions([]);
    }

    for (let i = suggestions.length; i < 4; i++) {
      await generateUsername(username).then((newUsername) => {
        suggestions[suggestions.length] = newUsername;
      });
    }

    if (suggestions.length === 4) {
      setCheckingUsername(false);
      return suggestions;
    }
  };

  const validateUsername = async (
    newUsername: string
  ): Promise<string | undefined> => {
    let errorMessage: string;

    // Reset the suggested username array if it exists.
    if (usernameSuggestions.length) {
      setUsernameSuggestions([]);
    }

    if (!newUsername) {
      errorMessage = "Please enter a username.";
      setValidUsername(false);
    } else if (newUsername === "") {
      errorMessage = "Please enter a username.";
      setValidUsername(false);
    } else if (newUsername.length < 3 || newUsername.length > 25) {
      errorMessage = "Username must be between 3 and 25 characters.";
      setValidUsername(false);
    } else {
      if (newUsername !== username) {
        setCheckingUsername(true);
        if (await checkUsernameAvailible(newUsername)) {
          setValidUsername(true);
        } else {
          errorMessage =
            "This username already exits. Please try another username or pick from one of the suggestions.";
          setValidUsername(false);
          generateSuggestedUsernames(newUsername).then((usernames) => {
            setUsernameSuggestions(usernames);
          });
        }
      } else {
        setValidUsername(true);
      }
    }

    setCheckingUsername(false);
    return errorMessage;
  };

  const validateBio = (newBio: string): string | undefined => {
    let errorMessage;

    if (newBio.length > 250) {
      errorMessage = "Bio cannot exceed 250 characters.";
      setValidBio(false);
    } else {
      setValidBio(true);
    }

    return errorMessage;
  };

  // Entire form valid
  const [validForm, setValidForm] = useState<boolean>(false);

  // Validate the fields on change.
  useEffect(() => {
    if (!validName || !validUsername || !validBio || checkingUsername) {
      setValidForm(false);
    }

    if (validName && validUsername && validBio && !checkingUsername) {
      setValidForm(true);
    }
  }, [checkingUsername, validBio, validName, validUsername]);

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

  interface NewProfileInfo {
    name: string;
    username: string;
    bio: string;
  }

  const submitChanges = ({ name, username, bio }: NewProfileInfo) =>
    editUserProfile({ userId, name, username, bio });

  // ! Add a "preview changes" button that doesn't submit the changes.
  // ! Add a "reset preview" button that changes the profile header back to values form the session.
  // ! Add a clear changes button that clears the changes the user has made.

  return (
    <Formik
      initialValues={{
        userId,
        name,
        username,
        bio
      }}
      onSubmit={(values, actions) => {
        submitChanges({ ...values })
          .then(({ ...values }) => {
            const { id, name, username, bio, role } =
              values.data.updateAccountInfo;

            if (
              typeof id === "string" &&
              typeof name === "string" &&
              typeof username === "string" &&
              typeof bio === "string" &&
              typeof role === "string" &&
              (role === "USER" || role === "ADMIN")
            ) {
              dispatch(updateProfile({ id, name, username, bio, role }));

              actions.setSubmitting(false);

              const newFormData = {
                userId: id,
                name,
                username,
                bio
              };

              actions.resetForm({
                values: newFormData
              });
            }
          })
          .catch((err) => {
            actions.setSubmitting(false);
            console.warn(err);
          });
      }}
    >
      {(props) => (
        <Form
          style={{
            width: "100%",
            height: "auto",
            textAlign: "center",
            display: "contents"
          }}
        >
          <VStack
            h="auto"
            w={{ base: "100%", md: "80vw", lg: "50vw" }}
            spacing={6}
          >
            <Heading as="h1">{"Edit your profile"}</Heading>
            <Field name="name" validate={validateName}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    form.errors.name && form.touched.name ? true : false
                  }
                >
                  <HStack
                    h="auto"
                    w="100%"
                    spacing={0}
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <FormLabel fontSize="xl" w="6.5rem" htmlFor="name">
                      {"Name"}
                    </FormLabel>
                    <VStack
                      h="auto"
                      w="100%"
                      spacing={2}
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <InputGroup>
                        <Input
                          required
                          {...fieldTheme}
                          {...field}
                          type="name"
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          isDisabled={form.isSubmitting}
                          {...(!form.errors.name && form.touched.name
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
                        <InputRightElement>
                          <Tooltip label="Name valid">
                            {!form.errors.name && form.touched.name ? (
                              <Text>
                                <Icon icon="mdi:check-bold" color="green" />
                              </Text>
                            ) : (
                              <Text>
                                <Icon
                                  icon="mdi:alpha-x-box-outline"
                                  color="red"
                                />
                              </Text>
                            )}
                          </Tooltip>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {typeof form.errors.name === "string"
                          ? form.errors.name
                          : ""}
                      </FormErrorMessage>
                    </VStack>
                  </HStack>
                </FormControl>
              )}
            </Field>
            <Field name="username" validate={validateUsername}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    form.errors.username && form.touched.username ? true : false
                  }
                >
                  <HStack
                    h="auto"
                    w="100%"
                    spacing={0}
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <FormLabel fontSize="xl" w="6.5rem" htmlFor="username">
                      {"Username"}
                    </FormLabel>
                    <VStack
                      h="auto"
                      w="100%"
                      spacing={2}
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <InputGroup>
                        <InputLeftAddon children="@" />
                        <Input
                          required
                          {...fieldTheme}
                          {...field}
                          type="username"
                          id="username"
                          name="username"
                          placeholder="JaneDoe"
                          isDisabled={form.isSubmitting}
                          {...(validUsername
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
                        <InputRightElement>
                          <Tooltip label="Check if this username is valid">
                            <Button
                              isLoading={checkingUsername}
                              type="submit"
                              variant="submit"
                              onClick={() => {
                                if (field.value !== username) {
                                  validateUsername(field.value);
                                }
                                form.setTouched({
                                  ...form.touched,
                                  [field.name]: true
                                });
                              }}
                            >
                              {validUsername ? (
                                <Text>
                                  <Icon icon="mdi:check-bold" color="green" />
                                </Text>
                              ) : (
                                <Text>
                                  <Icon
                                    icon="mdi:alpha-x-box-outline"
                                    color="red"
                                  />
                                </Text>
                              )}
                            </Button>
                          </Tooltip>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {typeof form.errors.username === "string"
                          ? form.errors.username
                          : ""}
                      </FormErrorMessage>
                      {usernameSuggestions && (
                        <HStack
                          w="100%"
                          h="auto"
                          alignContent="center"
                          justifyContent="center"
                        >
                          {usernameSuggestions.map((suggestedUsername) => (
                            <Button
                              type="button"
                              variant="unthemed"
                              key={suggestedUsername}
                              onClick={() => {
                                form.setFieldValue(
                                  "username",
                                  suggestedUsername
                                );
                                setValidUsername(true);
                              }}
                            >
                              {suggestedUsername}
                            </Button>
                          ))}
                        </HStack>
                      )}
                    </VStack>
                  </HStack>
                </FormControl>
              )}
            </Field>
            <Field name="bio" validate={validateBio}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={form.errors.bio && form.touched.bio ? true : false}
                >
                  <HStack
                    h="auto"
                    w="100%"
                    spacing={0}
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <FormLabel fontSize="xl" w="6.5rem" htmlFor="bio">
                      {"Bio"}
                    </FormLabel>
                    <VStack
                      h="auto"
                      w="100%"
                      spacing={4}
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Textarea
                        {...fieldTheme}
                        {...field}
                        isDisabled={form.isSubmitting}
                        id="bio"
                        rows={4}
                        placeholder="I am a furry looking to track my weekly chores and reward myself with pretty stickers and praise from friends."
                        {...(!form.errors.bio && form.touched.bio
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
                        {typeof form.errors.bio === "string"
                          ? form.errors.bio
                          : ""}
                      </FormErrorMessage>
                    </VStack>
                  </HStack>
                </FormControl>
              )}
            </Field>
            <VStack h="auto" w="100%" spacing={4}>
              <Button
                type="submit"
                variant="submit"
                isDisabled={!validForm}
                isLoading={props.isSubmitting}
              >
                {"Submit Changes"}
              </Button>
            </VStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default EditAccountForm;
