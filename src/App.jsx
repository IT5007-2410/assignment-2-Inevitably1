/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
  },
];


function TravellerRow(props) {
  const currentTraveller = props.traveller;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{currentTraveller.id}</td>
      <td>{currentTraveller.name}</td>
      <td>{currentTraveller.phone}</td>
      <td>{currentTraveller.bookingTime.toLocaleString()}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const rows = props.travellers.map((traveller) =>
    <TravellerRow key={traveller.id} traveller={traveller} />
  );

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/
        rows}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    const passenger = {
      name: form.travellername.value,
      phone: form.travellerphone.value,
    };
    this.props.bookfunction(passenger);
    form.travellername.value = ""; 
    form.travellerphone.value = "";

  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" required />
        <input type="text" name="travellerphone" placeholder="Phone" required />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    console.log(form.travellername.value);
    this.props.delfunction(form.travellername.value);
    form.travellername.value = "";

  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	<input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
	</div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: initialTravellers, selector: 1, nextId: initialTravellers.length + 1 };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click..*/
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    console.log('Booking new traveller:', passenger);
    const newTraveller = {
      id: this.state.nextId,
      name: passenger.name,
      phone: passenger.phone,
      bookingTime: new Date(),
    };
    console.log('current traveller:', this.state.travellers);
    this.setState((prevState) => ({
      travellers: [...prevState.travellers, newTraveller],
      nextId: prevState.nextId + 1
    }));
  }


  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    console.log("Delete function called",passenger);
    var newlist = [];
    this.state.travellers.forEach(element => {
        if (element.name != passenger) {
            newlist.push(element);
        }
    });
    
    this.setState({ travellers: newlist });
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	<div>
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
	</div>
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
		{/*Q3. Code to call component that Displays Travellers.*/}
		<Display travellers={this.state.travellers} />
		{/*Q4. Code to call the component that adds a traveller.*/}
    <Add bookfunction={this.bookTraveller} />
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
    <Delete delfunction={this.deleteTraveller}/>
	</div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
