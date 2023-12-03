<script>

export default {
  data() {
    return {
      showCustomerListView: true,
      getResult: [],
        
    }
  },
  beforeMount() {
   this.getCustomersByProgramId();
},
methods:{
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
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },

    async saveNewSignature() {
      var data = {
       customerId: this.selectedCustomer.id,
       create_time: new Date().toISOString().slice(0, 19).replace('T', ' ')
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

  }
}

    
</script>

<template>
   
    <h1>This is student Page</h1>
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
    
    <ul class="nav nav-tabs nav-justified">
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
    </div>

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
        <label for="Name">Welcome</label>
        <input
          type="text" disabled
          class="form-control"
          id="title"
          required
          v-model="selectedCustomer.name"
          name="title"
        />
      </div>
      
      
      <button @click="saveNewSignature" class="button-29">Sign In</button>
    </div>

  </transition-group>
    
  
</template>

<style scoped>
.form-control{
  background-color: rgb(255, 255, 255);
  width: 180px;
  text-align: center;
  margin: auto;
  font-size: 18px;
  padding: .2rem;
}

.nav-link{
color: white;
font-size: 23px;
padding: .1rem;
}
</style>