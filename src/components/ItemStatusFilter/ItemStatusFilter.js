import React, { Component } from 'react';

class ImportStatusFilter extends Component {

  buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
  ];

  render() {

    const {itemFilter, onFilterChange} = this.props;

    const buttons = this.buttons.map(({name, label}) => {
      const isActive = itemFilter === name;
      const btnClass = isActive ? 'btn-info' : 'btn-outline-secondary';
      return(
        <button type='button' 
          className={`btn ${btnClass}`} 
          key={name}
          onClick={()=>onFilterChange(name)}>
          {label}
        </button>
      );
    });

    return (
      <div className='btn-group'>
        {buttons}
      </div>  
    );
  };
}

export default ImportStatusFilter;