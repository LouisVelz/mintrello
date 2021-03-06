import React from "react";
import Column from "../column/column";
import initialData from "../../database/initial_data";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import ColumnForm from "../column/column_form";
// import { withRouter } from "react-router";

const mstp = () => {
  let data;
  if (localStorage.getItem("state") != null) {
    data = JSON.parse(localStorage.getItem("state"));
  } else {
    data = initialData;
  }

  return {
    data: data,
  };
};

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    localStorage.setItem("state", JSON.stringify(this.state));
  }
  // JSON.parse(localStorage.getItem('state'))
  editCard = (card) => {
    debugger;
    const newState = {
      ...this.state,
      cards: {
        ...this.state.cards,
        [card.id]: card,
      },
    };
    this.setState(newState);
    localStorage.setItem("state", JSON.stringify(newState));
  };

  addColumn = (column) => {
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [column.id]: column,
      },
      columnOrder: this.state.columnOrder.concat(column.id),
    };
    this.setState(newState);
    localStorage.setItem("state", JSON.stringify(newState));
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      this.setState(newState);
      localStorage.setItem("state", JSON.stringify(newState));
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        cardIds: newCardIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      localStorage.setItem("state", JSON.stringify(newState));
      return;
    }

    //Moving from one list to another
    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    this.setState(newState);
    localStorage.setItem("state", JSON.stringify(newState));
  };

  render() {
    // debugger;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="dashboard-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];
                const cards = column.cardIds.map(
                  (cardId) => this.state.cards[cardId]
                );

                return (
                  <Column
                    key={column.id}
                    column={column}
                    cards={cards}
                    index={index}
                    editCard={this.editCard}
                  />
                );
              })}
              {provided.placeholder}

              <ColumnForm
                onSubmit={this.addColumn}
                columns={this.state.columns}
                columnLength={this.state.columnOrder.length + 1}
                columnOrder={this.state.columnOrder}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default connect(mstp, null)(DashBoard);
