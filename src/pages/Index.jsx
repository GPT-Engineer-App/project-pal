import { useState } from "react";
import { Box, Button, Input, List, ListItem, Text, VStack, IconButton, useToast, Checkbox } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([{ text: "Sample Todo", isCompleted: false }]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleAddTodo = () => {
    if (input.trim() === "") {
      toast({
        title: "No content",
        description: "You can't add an empty todo.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, { text: input, isCompleted: false }]);
    setInput("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleToggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <VStack p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Todo List
      </Text>
      <Box>
        <Input placeholder="Add a new task" value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} size="lg" borderColor="gray.300" />
        <IconButton icon={<FaPlus />} colorScheme="teal" onClick={handleAddTodo} ml={4} aria-label="Add todo" size="lg" />
      </Box>
      <List spacing={5} w="100%">
        {todos.map((todo, index) => (
          <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
            <Checkbox isChecked={todo.isCompleted} onChange={() => handleToggleTodo(index)} mr={2} />
            <Text as={todo.isCompleted ? "s" : undefined}>{todo.text}</Text>
            <IconButton icon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteTodo(index)} aria-label="Delete todo" />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Index;
