<script>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import countries from './components/countries.json'
import {ref, computed} from 'vue'

export default {
  data() {
    return {
      getResult: [],
      newCustomer: {
        name:"",
        email:"",
        id:null
      },
      showCustomerListView: true,
      selectedCustomer:  {
        name:"",
        email:"",
        id:null
      },
        
    }
  },
  beforeMount() {
   this.getAllData()
},
  methods: {
  

    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },
    async saveNewCustomer() {
      var data = {
        name: this.newCustomer.name,
        email: this.newCustomer.email
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

    async saveNewSignature() {
      var data = {
       customerId: this.selectedCustomer.id
      };

      const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };
  const response = await fetch("http://localhost:8081/newsignature", requestOptions);
  const responseData = await response.json();
  // this.postId = data.id;
    },

    selectCustomer(customer) {
      console.log(customer.id);
      this.selectedCustomer = customer;
      this.showCustomerListView = false
    },

      // TutorialDataService.create(data)
      //   .then(response => {
      //     this.tutorial.id = response.data.id;
      //     console.log(response.data);
      //     this.submitted = true;
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
    //},
    
    // newTutorial() {
    //   this.submitted = false;
    //   this.tutorial = {};
    // }
  // },
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
  },
  setup() {
    let searchTerm = ref('')

    const searchCountries = computed(() => {
      if (searchTerm.value === '') {
        return []
      }

      let matches = 0

      return countries.filter(country => {
        if (country.name.toLowerCase().includes(searchTerm.value.toLowerCase()) && matches < 10) {
          matches++
          return country
        }
      })
    });

    const selectCountry = (country) => {
      selectedCountry.value = country
      searchTerm.value = ''
    }

    let selectedCountry = ref('')

    return {
      countries,
      searchTerm,
      searchCountries,
      selectCountry,
      selectedCountry
    }
  }
}
</script>

<template>
  <header>
    <img alt="Gracie logo" class="logo" src="./components/icons/pic1.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Ricky!" />
    </div>
  </header>

  <main>
    <!-- <div>
      <div class="form-group">
        <label for="Name">Name</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="newCustomer.name"
          name="title"
        />
      </div>      
      <div class="form-group">
        <label for="Email">Email</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="newCustomer.email"
          name="description"
        />
      </div>


      <button @click="saveNewCustomer" class="btn btn-success">Submit</button>
    </div> -->
    

    <!-- <div>
      <div class="form-group">
        <label for="Name">Name</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="newCustomer.name"
          name="title"
        />
      </div>
      
      
      <button @click="saveNewSignature" class="btn btn-success">Sign In</button>
    </div> -->


    <!-- <button class="btn btn-sm btn-primary" @click="getAllData">Get All</button> -->
    <transition-group name="view">
    <div   v-if = "showCustomerListView">
    <table>
     <tr v-for="customer in getResult" v-on:click="selectCustomer(customer)">
    

				<td>
          {{customer.name}}
        </td>
        <td>
          {{customer.email}}
        </td>
     </tr> 
    </table>
  </div>
			
  <div v-else>
      <div class="form-group">
        <label for="Name">Name</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="selectedCustomer.name"
          name="title"
        />
      </div>
      
      
      <button @click="saveNewSignature" class="btn btn-success">Sign In</button>
    </div>

  </transition-group>
    <!-- <TheWelcome />
    <div class="max-w-xs relative space-y-3">
      <label
        for="search"
        class="text-gray-900"
      >
        Type the name of a country to search
      </label> -->

      <!-- <input
        type="text"
        id="search"
        v-model="searchTerm"
        placeholder="Type here..."
        class="p-3 mb-0.5 w-full border border-gray-300 rounded"
      >

      <ul
        v-if="searchCountries.length"
        class="w-full rounded bg-white border border-gray-300 px-4 py-2 space-y-1 absolute z-10"
      >
        <li class="px-1 pt-1 pb-2 font-bold border-b border-gray-200">
          Showing {{ searchCountries.length }} of {{ countries.length }} results
        </li>
        <li
            v-for="country in searchCountries"
            :key="country.name"
            @click="selectCountry(country.name)"
            class="cursor-pointer hover:bg-gray-100 p-1"
        >
          {{ country.name }}
        </li>
      </ul>

      <p
        v-if="selectedCountry"
        class="text-lg pt-2 absolute"
      >
        You have selected: <span class="font-semibold">{{ selectedCountry }}</span>
      </p>
    </div> -->
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
