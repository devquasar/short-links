<template>
  <v-card min-height="600" max-width="1000">
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>

    <v-col v-else cols="7" class="py-2">
      <p>✔️ Choose kind of operation on link</p>

      <v-btn-toggle v-model="currentOperation" borderless mandatory>
        <v-btn v-for="(op, index) in operations" :key="index" :value="op.name">
          <span class="hidden-sm-and-down">{{ op.name }}</span>
          <v-icon right> {{ op.icon }} </v-icon>
        </v-btn>
      </v-btn-toggle>

      <v-text-field
        v-model="userURL"
        class="mt-6"
        label="Enter URL"
      ></v-text-field>

      <div
        v-for="(op, index) in operations"
        :key="index"
        v-show="currentOperation === op.name && apiResponse"
      >
        {{ `Your ${op.name} url is` }}
        <a :href="readyURL" target="blank">{{ readyURL }}</a>
      </div>

      <v-btn height="48" depressed @click="validateInputs">Process</v-btn>

      <div class="mt-4" v-if="errors.length">
        <span>❌ Please correct fix errors:</span>

        <v-list-item v-for="(error, index) in errors" :key="index">
          <v-list-item-content>
            <v-list-item-title class="blue--text darken-2">{{
              error
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </div>
    </v-col>
  </v-card>
</template>

<script>
import { processLink, isValid } from '../api'

export default {
  name: 'Home',
  data () {
    return {
      userURL: '',
      currentOperation: 'shorten',
      errors: [],
      loading: false,
      apiResponse: undefined,
      operations: [
        {
          name: 'shorten',
          icon: 'mdi-content-cut'
        },
        {
          name: 'expand',
          icon: 'mdi-arrow-expand-all'
        }
      ]
    }
  },
  computed: {
    readyURL () {
      let returnedURL = ''
      if (this.apiResponse) {
        const { short_url: shortUrl, long_url: longUrl } = this.apiResponse
        if (this.currentOperation === 'shorten') {
          returnedURL = shortUrl
        } else if (this.currentOperation === 'expand') {
          returnedURL = longUrl
        }
      }
      return returnedURL
    }
  },
  watch: {
    userURL () {
      this.errors = []
    }
  },
  methods: {
    validateInputs () {
      this.errors = []
      if (!this.userURL) {
        this.errors.push('Empty URL')
      }
      if (!isValid(this.userURL)) {
        this.errors.push('Incorrect URL')
      }
      this.submit()
    },
    submit () {
      if (this.errors.length === 0) {
        this.loading = true
        processLink(this.currentOperation, this.userURL).then((apiResponse) => {
          this.apiResponse = apiResponse
          this.loading = false
        })
      } else {
        this.apiResponse = undefined
      }
    }
  }
}
</script>

<style scoped>
.v-card {
  min-height: 450px;
  max-width: 700px;
  margin: auto;
}
.v-progress-circular {
  position: absolute;
  top: 265px;
  left: 465px;
}
</style>
