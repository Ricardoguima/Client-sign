<template>test</template>
<script>
import { onBeforeMount } from "vue";

export default {
  data() {
    return {
      selectedCustomerId: null,
      selectedCustomer: null,
    }
  },

  

  methods: {
    async getCustomerDetails(Id) {
      try {
        const res = await fetch(
          "http://localhost:8081/customerDetails?id=" + Id
        );

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
        this.selectedCustomer = result.data;
        console.log(result.data)
      } catch (err) {
        this.selectedCustomer = err.message;
      }
    },
  },

  beforeMount() {
    this.selectedCustomerId = this.$route.query.id;
    this.getCustomerDetails(this.selectedCustomerId);
    console.log(this.selectedCustomerId);
    this.getAttendanceByCustomerId(this.selectedCustomerId);
  },

};
</script>
