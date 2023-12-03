<script>

import TheWelcome from './components/TheWelcome.vue'
import countries from './components/countries.json'
// import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import {ref, computed} from 'vue'

export default {
  data() {
    return {
      activeItem: 'home',
      getResult: [],
     
      showCustomerListView: true,
      selectedCustomer:  {
        name:"",
        email:"",
        id:null
      },
        
    }
  },
  beforeMount() {
  //  this.getAllData();
   this.getCustomersByProgramId();
},
  methods: {
  
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },

    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },
   

  //   async saveNewSignature() {
  //     var data = {
  //      customerId: this.selectedCustomer.id
  //     };

  //     const requestOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data)
  // };
  // const response = await fetch("http://localhost:8081/newsignature", requestOptions);
  // const responseData = await response.json();
  // // this.postId = data.id;
  //   },

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

    async getCustomersByProgramId(ProgramId) {
      try {
        const res = await fetch('http://localhost:8081/customers?programid='+ ProgramId);

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
      
    </div>
  </header>

  <main>
    

  <router-view/>
    
    <!-- <button class="btn btn-sm btn-primary" @click="getAllData">Get All</button> -->
    <transition-group name="view">
    <div  v-if = "showCustomerListView">
      <!-- <ul class="nav nav-tabs nav-justified">
      <li v-on:click="getCustomersByProgramId(4)" class="nav-item">
       Kids
      </li>
      <li v-on:click="getCustomersByProgramId(5)" class="nav-item">
       Juniors
      </li>
      <li v-on:click="getCustomersByProgramId(6)" class="nav-item">
       Adults
      </li>
    </ul> -->
    
    <!-- <ul class="nav nav-tabs nav-justified">
      <li class="nav-item">
        <a class="nav-link" v-on:click.prevent="setActive('kids')" :class="{ active: isActive('kids') }" v-on:click="getCustomersByProgramId(4)">Kids</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" v-on:click.prevent="setActive('juniors')" :class="{ active: isActive('juniors') }" v-on:click="getCustomersByProgramId(5)">Juniors</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" v-on:click.prevent="setActive('adults')" :class="{ active: isActive('adults') }"  v-on:click="getCustomersByProgramId(6)">Adults</a>
      </li>
    </ul>
    <div class="tab-content py-3" id="myTabContent">
      <div class="tab-pane fade" :class="{ 'active show': isActive('kids') }" id="kids">Kids</div>
      <div class="tab-pane fade" :class="{ 'active show': isActive('juniors') }" id="juniors">Juniors</div>
      <div class="tab-pane fade" :class="{ 'active show': isActive('adults') }" id="adults">Adults</div>
    </div> -->

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
      <!-- <div class="form-group">
        <label for="Name">Welcome</label>
        <input
          type="text" disabled
          class="form-control"
          id="title"
          required
          v-model="selectedCustomer.name"
          name="title"
        />
      </div> -->
      
      
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
