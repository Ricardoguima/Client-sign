<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col><b-button v-b-modal.modal-1>New</b-button> </b-col>
      </b-row>
    </b-container>
    <b-modal
      id="modal-1"
      title="BootstrapVue"
      @ok="onSubmit"
      @hidden="resetModal"
    >
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

        <b-form-group id="input-group-4" label="Belt:" label-for="input-4">
          <b-form-select
            id="input-4"
            v-model="form.beltId"
            :options="belt"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Start Date:"
          label-for="input-5"
        >
          <b-form-datepicker
            id="example-datepicker"
            v-model="form.startDate"
            class="mb-2"
          ></b-form-datepicker>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-table
      select-mode="single"
      selectable
      striped
      hover
      :items="customersData"
      @row-selected="onCustomerRowSelected"
    ></b-table>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      getResult: [],
      selectedCustomer: [],
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
        programId: [],
        beltId: [],
        startDate: "",
      },
      show: true,
      programs: [
        { text: "Kids", value: 4 },
        { text: "Juniors", value: 5 },
        { text: "Adults", value: 6 },
      ],
      belt: [
        { text: "White", value: 1 },
        { text: "Grey White", value: 2 },
        { text: "Grey", value: 3 },
        { text: "Grey Black", value: 4 },
      ],
    };
  },
  beforeMount() {
    this.getAllData();
  },
  computed: {
    customersData() {
      var customizedArray = [];
      for (var i = 0; i < this.getResult.length; i++) {
        //  var program1 = {text: '',value: null};
        //  program1 = this.programs.filter(p => p.value == this.getResult[i].programId)

        var customer = {
          name: this.getResult[i].name,
          email: this.getResult[i].email,
          startDate:
            this.getResult[i].startDate != null
              ? moment(this.getResult[i].startDate).format("YYYY-MM-DD")
              : "",
          id: this.getResult[i].id,
          // program: this.programs.filter(p => p.value == Number(this.getResult[i].programId))
          // program: program1[0].text
        };
        customizedArray.push(customer);
      }
      return customizedArray;
    },
  },
  methods: {
    // getProgramName(programId){

    // },
    onCustomerRowSelected(items) {
      // this.selectedCustomer = items[0];
      // console.log(this.selectedCustomer);
      this.$router.push("/admin/student-details?id=" + items[0].id);
    },

    hideModal(id) {
      this.$bvModal.hide(id);
    },

    onSubmit(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.saveNewCustomer();
      console.log("Submit Clicked");
    },
    resetModal() {
      this.form = {};
    },

    async saveNewCustomer() {
      var data = {
        name: this.form.name,
        email: this.form.email,
        programId: this.form.programId,
        beltId: this.form.beltId,
        startDate: this.form.startDate,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        "http://localhost:8081/newcustomer",
        requestOptions
      );
      if (response.ok) {
        this.hideModal("modal-1");
        this.form = {};
      }
      // this.postId = data.id;
    },

    async getAllData() {
      try {
        const res = await fetch("http://localhost:8081/customers");

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

        this.getResult = result.data;
      } catch (err) {
        this.getResult = err.message;
      }
    },
  },
};
</script>
