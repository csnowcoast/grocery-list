"use client";
import styles from "./page.module.css";
import { useCallback, useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { validateText, validatePrice } from "./utils";

export default function Home() {
  const [groceryList, setGroceryList] = useState<GroceryList>([
    { name: 'Apples', price: 6 },
    { name: 'Bread', price: 3 },
    { name: 'Watermelon', price: 7 }
  ]);
  const [newFoodName, setNewFoodName] = useState<string>("");
  const [newFoodPrice, setNewFoodPrice] = useState<string>("");
  const [total, setTotal] = useState<number>(16);

  useEffect(() => {
    let newTotal = 0;
    for(const item of groceryList) {
      newTotal = newTotal + item.price;
    }
    setTotal(newTotal);
  }, [groceryList]);

  const addItem = useCallback((food: Food) => {
    setGroceryList([...groceryList, food]);
    if(total + food.price > 30) {
      alert("Over Budget!");
    }
    setNewFoodName("");
    setNewFoodPrice("");
  }, [groceryList, total]);

  const removeItem = useCallback((food: Food) => {
    setGroceryList(groceryList => groceryList.filter(item => item !== food));
  }, [groceryList]);

  const handleSubmit = () => {
    const validPrice = validatePrice(newFoodPrice);
    const validName = validateText(newFoodName);
    if(validName !== "" && validPrice > 0) {
      const newItem = { name: validName, price: validPrice };
      addItem(newItem);
    } else {
      alert("Entry is invalid!");
    }
  };

  const listContent = groceryList.map((item, index) => (
    <div key={index}>
      <ListItem divider alignItems="flex-start">
        <ListItemText primary={item.name} secondary={"$" + item.price.toFixed(2)}></ListItemText> 
        <Button color="secondary">
          <ClearIcon onClick={() => removeItem(item)} />
        </Button>
      </ListItem>
    </div>
  ));

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Box sx={{flexGrow: 1, width: '100%', bgcolor: 'gray', gap: 2, margin: 2}}>
          <List dense>
            <ListItem divider>
              <ListItemText disableTypography primary='Grocery List' sx={{fontSize: '25px'}}></ListItemText>
            </ListItem>
            {listContent}
            <ListItemText sx={{position: 'relative', left: '1em'}} primary={"Total: $" + total.toFixed(2)}></ListItemText>
          </List>
          <Box component="form" noValidate autoComplete="off">
            <TextField sx={{position: 'relative', left: '1em'}}
              id="food-name"
              label="Add Food"
              color="secondary"
              variant="filled"
              value={newFoodName}
              placeholder="Enter grocery item"
              onChange={(e) => setNewFoodName(e.target.value)}
            />
            <div />
            <TextField sx={{position: 'relative', left: '1em'}}
              id="food-price"
              label="Add Price"
              color="secondary"
              variant="filled"
              value={newFoodPrice}
              placeholder="Enter item price ($)"
              onChange={(e) => setNewFoodPrice(e.target.value)}
            />
          </Box>
          <Box sx={{bgcolor: 'gray', margin: 2, display: "grid"}}>
             <Button 
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}