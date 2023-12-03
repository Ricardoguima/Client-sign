<template>
    <div>
        <b-container class="bv-example-row">
  <b-row>
    <b-col>1 of 3</b-col>
    <b-col>2 of 3</b-col>
    <b-col><b-button v-b-modal.modal-1>New</b-button>
    </b-col>
  </b-row>
</b-container>
<b-modal id="modal-1" title="BootstrapVue" @ok="onSubmit">
  <b-form v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Program:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.programId"
          :options="programs"
          required
        ></b-form-select>
      </b-form-group>

      

      
    </b-form>
    
</b-modal>
        
      <b-table striped hover :items="getResult"></b-table>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
            getResult: [],
        
            form: {
          email: '',
          name: '',
          food: null,
          checked: [],
          },
          show: true,
          programs: [{text: 'Kids', value: 4},
          {text: 'Juniors', value: 5}, 
          {text: 'Adults', value: 6}]
        }
      },
      beforeMount (){
        this.getAllData()
      },
      methods: {
        onSubmit(bvModalEvent) {
            bvModalEvent.preventDefault();
            this.saveNewCustomer();
            console.log ("Submit Clicked");
        },

        async saveNewCustomer() {
      var data = {
        name: this.form.name,
        email: this.form.email
      };

      const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };
  const response = await fetch("http://localhost:8081/newcustomer", requestOptions);
  const responseData = await response.json();
  // this.postId = data.id;
    },

      async getAllData() {
      try {
        const res = await fetch('http://localhost:8081/customers');

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          length: res.headers.get("Content-Length"),
          data: data,
        };

        this.getResult = (result.data);
      } catch (err) {
        this.getResult = err.message;
      }
    },
    }
}

  </script>
