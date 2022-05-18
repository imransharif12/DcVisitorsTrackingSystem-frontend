<template>
  <div class="p-2">
    <div>
      <div>
        <router-link to="/add-admin">
          <button
            style="margin-left: 12px"
            class="btn btn-success rounded-pill mb-2"
          >
            Add
          </button>
        </router-link>
        <div class="col-sm-12 col-md-6 float-right">
          <div
            id="tickets-table_filter"
            class="dataTables_filter text-md-right"
          >
            <label class="d-inline-flex align-items-center">
              Search:
              <b-form-input
                v-model="filter"
                type="search"
                placeholder="Search..."
                class="form-control form-control-sm ml-2"
              ></b-form-input>
            </label>
          </div>
        </div>
        <b-table
          :items="loans"
          :fields="fields"
          responsive="sm"
          :per-page="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          ref="selectableTable"
          :sort-desc.sync="sortDesc"
          :filter="filter"
          :filter-included-fields="filterOn"
          show-empty
          empty-text="No record found"
          empty-filtered-text="No search result found"
          @filtered="onFiltered"
        >
          <template v-slot:cell(actions)="loans">
            <i
              class="fas fa-eye"
              style="color: green; cursor: pointer; margin-left: 19px"
              @click="viewRecord(loans)"
            ></i
            >&nbsp;
          </template>
          <template v-slot:cell(f_name)="loans">
            {{ viewFName(loans) }}
          </template>
          <template v-slot:cell(l_name)="loans">
            {{ viewLName(loans) }}
          </template>
        </b-table>
      </div>
      <div class="row">
        <div class="col">
          <div class="dataTables_paginate paging_simple_numbers float-right">
            <ul class="pagination pagination-rounded mb-0">
              <!-- pagination -->
              <b-pagination
                v-model="currentPage"
                :per-page="perPage"
                :total-rows="rows"
              ></b-pagination>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { admins } from "../api/services";
import Vue from "vue";

import moment from "moment";
Vue.prototype.moment = moment;
export default {
  data() {
    return {
      loans: [],
      record: {},
      perPage: 10,
      currentPage: 1,
      totalRows: 1,
      pageOptions: [10, 25, 50, 100],
      sortBy: "id",
      sortDesc: true,
      filter: null,
      filterOn: [],
      fields: [
        { key: "code", label: "ID" },
        { key: "f_name", label: "Name" },
        { key: "l_name", label: "Last Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
      ],
    };
  },
  computed: {
    rows() {
      return this.loans.length;
    },
  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    viewFName(object) {
      console.log(object.item);
      return object.item.f_name
        ? object.item.f_name
        : object.item.vistors
        ? object.item.vistors.v_f_name
        : "";
    },
    viewLName(object) {
      return object.item.l_name
        ? object.item.l_name
        : object.item.vistors
        ? object.item.vistors.v_l_name
        : "";
    },
    viewRecord(object) {
      localStorage.setItem("record", JSON.stringify(object.item));
      this.$router.push({ name: "Request" });
    },
  },
  mounted() {
    admins().then((responce) => {
      if (responce.code == 200) {
        this.loans = responce.data;
      }
    });
  },
};
</script>
<style scoped>
.btn-success {
  border-color: #5cb700;
  background-color: rgb(92, 183, 0);
  color: white;
}
</style>
