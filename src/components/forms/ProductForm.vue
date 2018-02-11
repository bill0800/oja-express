<template>
    <div class="col-md-12">
        <div class="alert alert-danger fade show"
             :class="{gone: errorMsg === null}" role="alert">
            {{errorMsg}}
        </div>
        <form class="col-md-12" enctype="multipart/form-data" @submit.prevent="submit"
              @keydown="clearErrors($event.target.name)">
            <div class="form-group">
                <label>To which of your stores does this product belong ?</label>
                <div class="row col-md-12 mb-2">
                    <div v-for="localStore in storesPageData" class="store-item card col"
                         @click="selectStore(localStore)" :class="{active: store && store.id === localStore.id}">
                        <div class="card-body">
                            <img class="img-circle pull-left" :src="localStore | store_avatar"
                                 style="width:50px; height: 50px; display: inline-block">
                            <div>
                                <span class="d-inline-block font-weight-bold">{{localStore.name}}</span>
                                <p class="list-group-item-text">{{localStore.admin.email}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <pagination :hasMore="hasMoreStores" :list="stores"
                                :itemsPerPage="5" @noNext="nextStores">
                    </pagination>
                </div>
            </div>
            <div class="form-group">
                <label for="name">Name<span class="text-danger">*</span></label>
                <input id="name" type="text" class="form-control"
                       name="name" v-model="name" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('name')}">
                    {{fieldError('name')}}
                </span>
            </div>
            <div class="form-group">
                <label for="description">Description<span class="text-danger">*</span></label>
                <textarea id="description" class="form-control"
                          name="description" v-model="desc" required>
                </textarea>
                <span class="text-danger" :class="{hidden: !fieldHasError('description')}">
                    {{fieldError('description')}}
                </span>
            </div>
            <div class="form-group">
                <label>Select Product Categories</label>
                <div class="row col-md-12 mb-2">
                    <div v-for="category in categoriesPageData" class="list-group-item card col"
                         @click="toggleCategory(category)" :class="{active: selectedCategories.hasOwnProperty(category.id)}">
                        <div class="card-body">
                            <span class="d-inline-block font-weight-bold">{{category.name}}</span>
                            <span class="d-inline-block">{{category | parent}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <pagination :hasMore="hasMoreCategories" :list="categories"
                            :itemsPerPage="5" @noNext="nextCategories">
                </pagination>
            </div>
            <div class="form-group">
                <label for="name">Price<span class="text-danger">*</span></label>
                <input id="price" type="text" class="form-control"
                       name="price" v-model="price" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('price')}">
                    {{fieldError('price')}}
                </span>
            </div>
            <div class="form-group">
                <label>How do you measure this product ?</label>
                <div class="row col-md-12">
                    <div v-for="availableUnit in Object.keys(availableUnits)" class="card col-4">
                        <div class="card-body">
                            <input  class="form-control" type="radio"
                                    @change="selectUnit(availableUnit)" name="unit_of_measure" :value="chosenUnit"/>
                            <label class="text-center">{{availableUnit}}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="allowOtherUnits" class="form-group">
                <label for="unit_of_measure">Unit of Measure (Singular)<span class="text-danger">*</span></label>
                <input id="unit_of_measure" class="form-control" name="unit_of_measure"
                       v-model="unit" required>
                <span class="text-danger" :class="{hidden: !fieldHasError('unit_of_measure')}">
                    {{fieldError('unit_of_measure')}}
                </span>
            </div>
            <div v-if="allowOtherUnits" class="form-group">
                <label for="unit_of_measure_plural">Unit of Measure (Plural)<span class="text-danger">*</span></label>
                <input id="unit_of_measure_plural" class="form-control" name="unit_of_measure_plural"
                       v-model="pluralUnit" required>
                <span class="text-danger" :class="{hidden: !fieldHasError('unit_of_measure_plural')}">
                    {{fieldError('unit_of_measure_plural')}}
                </span>
            </div>
            <div class="form-group">
                <label for="tax_charge">Tax Charge<span class="text-danger">*</span> </label>
                <input id="tax_charge" class="form-control" name="tax_charge"
                       v-model="taxCharge" required>
                <span class="text-danger" :class="{hidden: !fieldHasError('tax_charge')}">
                    {{fieldError('tax_charge')}}
                </span>
            </div>
            <div class="form-group">
                <label for="delivery_charge">Amount charged per delivery<span class="text-danger">*</span> </label>
                <input id="delivery_charge" class="form-control" name="delivery_charge"
                       v-model="deliveryCharge" required>
                <span class="text-danger" :class="{hidden: !fieldHasError('delivery_charge')}">
                    {{fieldError('delivery_charge')}}
                </span>
            </div>
            <div class="form-group">
                <label for="tax_charge">How much of this product is currently in stock ?<span class="text-danger">*</span> </label>
                <input id="number_in_stock" class="form-control" name="number_in_stock"
                       v-model="numInStock" required>
                <span class="text-danger" :class="{hidden: !fieldHasError('number_in_stock')}">
                    {{fieldError('number_in_stock')}}
                </span>
            </div>
            <div class="form-group">
                <label for="tax_charge">Minimum number before restocking this product ?<span class="text-danger">*</span> </label>
                <input id="min_number_for_restock" class="form-control" name="min_number_for_restock"
                       v-model="minNumForRestock" required>
                <span class="text-danger" :class="{hidden: !fieldHasError('min_number_for_restock')}">
                    {{fieldError('min_number_for_restock')}}
                </span>
            </div>
            <div class="form-group">
                <label for="tax_charge">Number sold<span class="text-danger">*</span> </label>
                <input id="number_sold" class="form-control" name="number_sold"
                       v-model="numberSold" required>
                <span class="text-danger" :class="{hidden: !fieldHasError('number_sold')}">
                    {{fieldError('number_sold')}}
                </span>
            </div>
            <div class="form-group">
                <input id="is_active" type="checkbox" class="form-check-input"
                       name="price" v-model="isActive" required/>
                <label for="is_active">Is Active?<span class="text-danger">*</span></label>
                <span class="text-danger" :class="{hidden: !fieldHasError('is_active')}">
                    {{fieldError('is_active')}}
                </span>
            </div>
            <div v-if="nextImagePosition > 0" class="col-md-12">
                <h4>Product Images</h4>
                <div class="row">
                    <div v-for="image in imageObjects" class="col-md-2">
                        <img :src="image.image_url" style="width: 75%;">
                        <a class="btn btn-danger" @click="removeImage(image)">Remove</a>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="avatar"> New Avatars</label>
                <input id="avatar" class="form-control-file" type="file" accept="image/*"
                       @change="addImages($event.target.files)" multiple/>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-block btn-success" :class="{disabled: anyError}">Save</button>
            </div>
        </form>
    </div>

</template>

<script>
  import Pagination from '../../components/Pagination.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as getters from '../../store/getter-types'
  import * as mutations from '../../store/mutation-types'
  import * as actions from '../../store/action-types'

  const {mapGetters, mapMutations} = createNamespacedHelpers('products')
  const storeMaps = createNamespacedHelpers('stores')
  const categoryMaps = createNamespacedHelpers('categories')
  const productImageMaps = createNamespacedHelpers('productImages')

  export default {
    name: 'product-form',
    components: {Pagination},
    data () {
      return {
        storesPagination: null,
        categoriesPagination: null,
        selectedCategories: {},
        store: null,
        availableUnits: {
          'Kilogram': {singular: 'Kg', plural: 'Kgs'},
          'Pound': {singular: 'lb', plural: 'lbs'},
          'Ounce': {singular: 'ounce', plural: 'ounces'},
          'Other': {}
        },
        chosenUnit: null,
        imageObjects: {},
        imageFiles: {}
      }
    },
    methods: {
      ...mapMutations({
        setFormField: mutations.SET_FORM_FIELD,
        clearErrors: mutations.CLEAR_ERRORS,
        recordErrors: mutations.RECORD_ERRORS,
        reset: mutations.RESET
      }),
      ...storeMaps.mapActions({
        nextStores: actions.FETCH_NEXT
      }),
      ...productImageMaps.mapActions({
        deleteImage: actions.DELETE
      }),
      ...categoryMaps.mapActions({
        nextCategories: actions.FETCH_NEXT
      }),
      addImages (files) {
        for (let index = 0; index < files.length; index++) {
          let reader = new FileReader()
          let position = this.nextImagePosition
          reader.onload = (event) => {
            let image = {}
            image[position] = {
              _position: position,
              image_url: event.target.result
            }
            this.imageObjects = {...this.imageObjects, ...image}
          }
          let file = {}
          file[position] = {
            _position: position,
            file: files[index]
          }
          this.imageFiles = {...this.imageFiles, ...file}
          reader.readAsDataURL(files[index])
        }
      },
      onImageDeleteSuccess (response) {
        console.log(response)
      },
      onImageDeleteFailure (error) {
        console.log(error)
      },
      deleteImage (image) {
        let objects = this.imageObjects
        delete objects[image._position]
        this.imageObjects = {...objects}
      },
      removeImage (image) {
        if (image.hasOwnProperty('id')) {
          this.deleteImage({id: image.id})
            .then((response) => {
              this.deleteImage(image)
              this.onImageDeleteSuccess(response)
            })
            .catch(this.onImageDeleteFailure.bind(this))
        } else {
          this.deleteImage(image)
        }
      },
      selectUnit (unit) {
        this.chosenUnit = unit
        if (unit !== 'Other') {
          this.unit = this.availableUnits[unit].singular
          this.pluralUnit = this.availableUnits[unit].plural
        }
      },
      selectStore (store) {
        this.store = store
        this.setFormField({field: 'store_id', value: store.id})
        this.clearErrors('store_id')
      },
      selectCategory (category) {
        let newEntry = {}
        newEntry[category.id] = category
        this.selectedCategories = {...this.selectedCategories, ...newEntry}
      },
      deselectCategory (category) {
        let newSet = this.selectedCategories
        delete newSet[category.id]
        this.selectedCategories = {...newSet}
      },
      isCategorySelected (category) {
        return this.selectedCategories.hasOwnProperty(category.id)
      },
      toggleCategory (category) {
        if (this.isCategorySelected(category)) {
          this.deselectCategory(category)
        } else {
          this.selectCategory(category)
        }
      },
      setEntity (product) {
        console.log(product)
        this.name = product.name
        this.price = product.price
        this.chosenUnit = 'Other'
        this.unit = product.unit_of_measure
        this.pluralUnit = product.unit_of_measure_plural
        this.taxCharge = product.tax_charge
        this.deliveryCharge = product.delivery_charge
        this.numInStock = product.number_in_stock
        this.minNumForRestock = product.min_number_for_restock
        this.number_sold = product.number_sold
        this.storeId = product.store_id
        this.store = {id: product.store_id}
        this.desc = product.description
        this.isActive = product.is_active
        let images = {}
        let position = this.nextImagePosition
        product.images.data.forEach((image) => {
          image._position = position++
          images[image._position] = image
        })
        this.imageObjects = {...images}
        let categories = {}
        product.categories.data.forEach((category) => {
          categories[category.id] = category
        })
        this.selectedCategories = {...categories}
      },
      submit () {
        this.setFormField({field: 'categories', value: Object.keys(this.selectedCategories)})
        this.setFormField({field: 'images', value: Object.values(this.imageFiles).map((imageFile) => imageFile.file)})
        if (this.anyError) {
          return
        }
        this.$emit('submitProduct')
      }
    },
    computed: {
      ...mapGetters({
        getFormField: getters.GET_FORM_FIELD,
        errorMsg: getters.GET_ERROR_MSG,
        fieldHasError: getters.HAS_ERROR_IN_FIELD,
        anyError: getters.ANY_ERRORS,
        fieldError: getters.GET_ERROR_BY_FIELD
      }),
      ...storeMaps.mapGetters({
        stores: getters.ALL,
        storesPaginationData: getters.PAGINATION
      }),
      ...categoryMaps.mapGetters({
        categories: getters.ALL,
        categoriesPaginationData: getters.PAGINATION
      }),
      storesPageData () {
        return (this.storesPagination) ? this.storesPagination.pageData : []
      },
      hasMoreStores () {
        return this.storesPaginationData.hasOwnProperty('links') && this.storesPaginationData.links.hasOwnProperty('next')
      },
      categoriesPageData () {
        return (this.categoriesPagination) ? this.categoriesPagination.pageData : []
      },
      hasMoreCategories () {
        return this.categoriesPaginationData.hasOwnProperty('links') && this.categoriesPaginationData.links.hasOwnProperty('next')
      },
      allowOtherUnits () {
        return this.chosenUnit === 'Other'
      },
      nextImagePosition () {
        return Object.keys(this.imageObjects).length
      },
      name: {
        get () {
          return this.getFormField('name')
        },
        set (value) {
          this.setFormField({field: 'name', value: value})
        }
      },
      price: {
        get () {
          return this.getFormField('price')
        },
        set (value) {
          this.setFormField({field: 'price', value: value})
        }
      },
      unit: {
        get () {
          return this.getFormField('unit_of_measure')
        },
        set (value) {
          this.setFormField({field: 'unit_of_measure', value: value})
        }
      },
      pluralUnit: {
        get () {
          return this.getFormField('unit_of_measure_plural')
        },
        set (value) {
          this.setFormField({field: 'unit_of_measure_plural', value: value})
        }
      },
      taxCharge: {
        get () {
          return this.getFormField('tax_charge')
        },
        set (value) {
          this.setFormField({field: 'tax_charge', value: value})
        }
      },
      deliveryCharge: {
        get () {
          return this.getFormField('delivery_charge')
        },
        set (value) {
          this.setFormField({field: 'delivery_charge', value: value})
        }
      },
      numInStock: {
        get () {
          return this.getFormField('number_in_stock')
        },
        set (value) {
          this.setFormField({field: 'number_in_stock', value: value})
        }
      },
      minNumForRestock: {
        get () {
          return this.getFormField('min_number_for_restock')
        },
        set (value) {
          this.setFormField({field: 'min_number_for_restock', value: value})
        }
      },
      numberSold: {
        get () {
          return this.getFormField('number_sold')
        },
        set (value) {
          this.setFormField({field: 'number_sold', value: value})
        }
      },
      storeId: {
        get () {
          return this.getFormField('store_id')
        },
        set (value) {
          this.setFormField({field: 'store_id', value: value})
        }
      },
      desc: {
        get () {
          return this.getFormField('description')
        },
        set (value) {
          this.setFormField({field: 'description', value: value})
        }
      },
      isActive: {
        get () {
          return this.getFormField('is_active')
        },
        set (value) {
          this.setFormField({field: 'is_active', value: value})
        }
      }
    },
    mounted () {
      this.storesPagination = this.$children[0]
      this.categoriesPagination = this.$children[1]
    }
  }
</script>

<style scoped>
    .store-item.active {
        background-color: #cad8d9 !important;
        border: 3px solid darkgreen;
        color: black
    }

    label {
        font-weight: bolder;
    }
</style>