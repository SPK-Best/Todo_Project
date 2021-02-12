<template>
  <div>
      <v-content>
        <v-container>

          <h2 class="display-1 pl-3">
            Todo List:&nbsp;
            <v-fade-transition leave-absolute>
              <span :key="`tasks-${tasks.length}`">
                {{ tasks.length }}
              </span>
            </v-fade-transition>
          </h2>

          <br>

          <v-text-field
              label="Add Todo"
              outlined
              v-model="task"
              @keydown.enter="addItem"
          >

            <v-fade-transition slot="append">
              <v-icon v-if="task" @click="addItem">
              </v-icon>
            </v-fade-transition>
          </v-text-field>

          <v-divider class="mt-3"></v-divider>

          <v-layout my-1 align-center>

            <strong class="mx-3 info--text text--darken-3">
              Remaining: {{ calculateRemaining }}
            </strong>

            <v-divider vertical></v-divider>

            <strong class="mx-3 green--text"> Completed: {{ calculateCompleted }} </strong>

            <v-divider vertical></v-divider>

            <v-spacer></v-spacer>

            <strong class="mx-3 white--text"> {{ calculateProgress }} % </strong>


            <v-progress-circular :value="calculateProgress" class="mr-2"></v-progress-circular>

          </v-layout>

          <v-divider class="mb-3"></v-divider>

          <v-card v-if="tasks.length > 0" color="#90CAF9">
            <v-slide-y-transition class="py-0" group tag="v-list">
              <template v-for="(task, i) in tasks">
                <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

                <v-list-tile :key="`${i} - ${task.text}`">
                  <v-list-tile-action>
                    <v-checkbox v-model="task.done" color="success">
                      <div
                          slot="label"
                          :class="(task.done && 'text-decoration-line-through') || 'text--primary'"
                          v-text="task.text"
                      >Line-through text</div>
                    </v-checkbox>
                  </v-list-tile-action>
                  <v-spacer></v-spacer>
                </v-list-tile>
              </template>
            </v-slide-y-transition>
          </v-card>
        </v-container>
      </v-content>
  <v-btn
      color="#E53935"
      type="submit"
      class="mr-4"
      @click="userLogout"
  >
    Logout
  </v-btn>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Todo.vue",
  data() {
    return {
      user: null,
      tasks: [],
      task: null
    };
  },
  computed: {
    calculateCompleted() {
      return this.tasks.filter(task => task.done).length;
    },
    calculateProgress() {
      if ((isNaN(this.calculateCompleted / this.tasks.length) * 100)){
        return 100;
      }
      else {
        return (this.calculateCompleted / this.tasks.length) * 100;
      }
    },
    calculateRemaining() {
      return this.tasks.length - this.calculateCompleted;
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    userLogout() {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          this.$router.push('/login')
        })
      })
    },
    addItem() {
      if (this.task.text != '') {
          this.tasks.push({
          done: false,
          text: this.task
        });
      }
      this.task = null;
    }
  }
};
</script>