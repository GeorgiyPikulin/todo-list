import React, { Component } from 'react';
import TodoList from '../components/TodoList/TodoList';
import AppHeader from '../components/AppHeader/AppHeader';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ItemStatusFilter from '../components/ItemStatusFilter/ItemStatusFilter';
import ItemAddForm from '../components/ItemAddForm/ItemAddForm';
import './App.css'

class App extends Component {

  maxId = 1;

  state = {
    todoData:[
      this.createTodoItem('Drink Cofee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a Lunch')
    ],
    term: '',
    statusFilter: 'all' 
  };

  createTodoItem (label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const indx = todoData.findIndex((el) => el.id === id );
      
      const newArray = [ 
        ...todoData.slice(0,indx), 
        ...todoData.slice(indx +1)
      ];
			
      return {
				todoData: newArray
			};
		});
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState (({todoData}) => {
      const newArray = [
        ...todoData,
        newItem
      ];
      
      return {
        todoData: newArray
      }
    });
  };

  toggleProperty(arr, id, propName) {
    const indx = arr.findIndex((el) => el.id === id );

      const oldItem = arr[indx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };

      return [ 
        ...arr.slice(0,indx), 
        newItem,
        ...arr.slice(indx +1)
      ];
  };

  toggleItemDone = (id) => {
    this.setState(({todoData}) => {
      return {
				todoData: this.toggleProperty(todoData, id, 'done') 
			};
    });
  };

  toggleItemImportant = (id) => {
    this.setState(({todoData}) => {
      return {
				todoData: this.toggleProperty(todoData, id, 'important') 
			};
    });
  };

  onItemSearchChange = (term) => {
    this.setState({ term });
  };

  onItemFilterChange = (statusFilter) => {
    this.setState({ statusFilter });
  }

  search(items, term) {
    if(term.length === 0) {
      return items;
    };

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  itemFilter(items, filter) {
    switch(filter){
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default: 
        return items;
    };
  };


  render() {
    const {todoData, term, statusFilter} = this.state;
    const visibleItems = this.itemFilter(this.search(todoData, term), statusFilter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onItemSearchChange} />
          <ItemStatusFilter 
            itemFilter={statusFilter} 
            onFilterChange={this.onItemFilterChange} />
        </div>

        <TodoList 
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.toggleItemDone}
          onToggleImportant={this.toggleItemImportant}
          />
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  };
};



  
export default App;