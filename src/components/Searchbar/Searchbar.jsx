import { useState } from 'react';
import PropTypes from "prop-types";
import Header from '../Markup/Header/Header';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
import {Inner, Form, Button, Label, Input} from "./Searchbar.styled";

export default function Searchbar({onSubmit}) {
  const [search, setSearch] = useState('');
  
  //Сбрасываем форму, очищаем поля
  const reset = () => {
    setSearch('');
  };
  
  //Следим за отправкой формы и передаем значения с поля в Арр
 const onSubmitForm = e => {
   e.preventDefault();
    
   //Запрещаем отправку пустой формы
    if (search.trim() === '') {
      toast.error('Enter search word');
      return;
    }

    onSubmit(search);

    reset();
  };

  //Получаем данные с инпута и пишем в переменную состояния search
  const onChangeInput = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  return (      
    <header>
      <Inner>
        <Header />
        <Form onSubmit={onSubmitForm}>
          <Button type="submit">
            <Label>Search</Label>
          </Button>       
          <Input
            type="text"
            autoFocus
            autoComplete="off"
            placeholder="Search images and photos"
            value={search}
            onChange={onChangeInput}
          />
        </Form>
      </Inner>
    </header>
  );
}


Searchbar.propTypes = {
onSubmit: PropTypes.func.isRequired,
};