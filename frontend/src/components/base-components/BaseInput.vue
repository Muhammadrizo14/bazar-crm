<template>
    <div class="field" :class="containerClass">
        <label :for="tag" class="block text-900 text-0 font-medium mb-2">{{ labelText }}</label>
        <template v-if="type==='text'">
            <InputText
                :id="tag"
                :class="{'p-invalid': errors[tag]}"
                v-bind="$attrs"
                @input="e => $emit('update:modelValue', e.target.value)"
            />
        </template>
        <template v-if="type==='mask'">
            <InputMask
                :id="tag"
                :class="{'p-invalid': errors[tag]}"
                v-bind="$attrs"
                @update:modelValue="e => $emit('update:modelValue', e)"
            />
        </template>
        <template v-if="type==='disabled-text'">
            <p class="disabled-p-input">
                {{ $attrs.disabledText }}
            </p>
        </template>
        <template v-else-if="type==='dropdown'">
            <Dropdown
                class="w-100"
                :id="tag"
                :name="tag"
                v-bind="$attrs"
                :value="findItem"
                :options="options"
                :optionLabel="optionLabel"
                v-model="modelNode"
                @change="dropdownSelected"
            >
                <template #value="slotProps" v-if="typeof optionLabel !== 'function'">
                    <div class="dropdown-value">
                        <template v-if="slotProps.value">
                            <span >{{ $t(slotProps.value[optionLabel]) }}</span>
                        </template>
                        <span v-else>
                        {{ slotProps.placeholder }}
                    </span>
                    </div>
                </template>

                <template #option="slotProps" v-if="typeof optionLabel !== 'function'">
                    <div class="dropdown-option">
                        <span>{{ $t(slotProps.option[optionLabel]) }}</span>
                    </div>
                </template>
            </Dropdown>
        </template>

        <template v-if="type==='password'">
            <Password
                :id="tag"
                :class="{'p-invalid': errors[tag]}"
                v-bind="$attrs"
                v-model="modelNode"
                @input="$emit('update:modelValue', modelNode)"
            />
        </template>
        <template v-if="type==='textarea'">
            <Textarea
                v-bind="$attrs"
                @input="e => $emit('update:modelValue', e.target.value)"
            />
        </template>
        <template v-if="type==='price'">
            <InputNumber
                :max-fraction-digits="0"
                v-bind="$attrs"
                @input="onInputNumber"
                v-model="modelNode"
                mode="currency"
                currency="UZS"
                locale="en-US"
            />
        </template>
        <template v-if="type==='number'">
            <InputNumber
                v-bind="$attrs"
                @input="onInputNumber"
                v-model="modelNode"
            />
        </template>
        <template v-else-if="type==='bool'">
            <InputSwitch
                :id="tag"
                :name="tag"
                v-bind="$attrs"
                v-model="modelNode"
                @input="(e) => $emit('update:modelValue', modelNode)"
                :class="{'p-invalid': errors[tag]}"
            />
        </template>
        <template v-else-if="type==='time'">
            <Calendar
                :id="tag"
                :name="tag"
                v-bind="$attrs"
                v-model="modelNode"
                @change="convertToString"
                @date-select="convertToString"
                :showTime="true"
                hourFormat="24"
                :timeOnly="true"
            />
        </template>
        <template v-else-if="type==='date'">
            <Calendar
                :id="tag"
                :name="tag"
                v-bind="$attrs"
                v-model="modelNode"
                @change="onDateSelect"
                @date-select="onDateSelect"
                :class="{'p-invalid': errors[tag]}"
                inputClass="w-full"
                :showIcon="true"
                :showButtonBar="true"
            />
        </template>
        <template v-if="errors[tag]">
            <p class="p-error mb-0" v-for="error in errors[tag]" :key="error">{{ $t(error) }}</p>
        </template>
    </div>
</template>

<script>
import {getDateByTimezone, timeFromDate, timeZoneUz} from "../../helper";

export default {
    name: "BaseInput",
    emits: ['dropdownSelected', 'update:modelValue'],
    data() {
        return {
            modelNode: false
        }
    },
    props: {
        tag: {type: String},
        type: {type: String},
        labelText: {type: String},
        errors: {
            default: []
        },
        options: {type: Array},
        containerClass: {type: String},
        optionLabel: {
            type: String,
            default: 'name'
        },
        optionValue: {
            type: String,
            default: 'id'
        },
    },
    computed: {
        findItem() {
            let item = null
            if (this.$attrs.modelValue !== undefined && this.$attrs.modelValue !== null && this.options && this.options.length) {
                if (this.$attrs.modelValue.id) {
                    item = this.options.find(elem => {
                        return elem.id === this.$attrs.modelValue.id
                    })
                } else {
                    item = this.options.find(elem => {
                        return elem.id === this.$attrs.modelValue
                    })
                }
            }
            return item
        },
    },
    watch: {
        findItem() {
            this.modelNode = this.findItem
        },
        "$attrs.modelValue"() {
            if (this.type === 'date' && this.$attrs.modelValue) {
                this.modelNode = new Date(this.$attrs.modelValue)
            }
        },
    },
    created() {
        switch (this.type) {
            case "date":
                this.modelNode = this.$attrs.modelValue ? new Date(this.$attrs.modelValue) : null
                break
            case "time":
            case "price":
            case "number":
            case "password":
                this.modelNode = this.$attrs.modelValue
                break
            case "dropdown":
                this.modelNode = this.findItem
                break
            case "bool":
                this.modelNode = !!(this.$attrs.modelValue || this.$attrs.modelValue === 1)
                break
        }
        if (['time', 'date', 'bool'].includes(this.type)) {
            this.$emit('update:modelValue', this.modelNode)
        }
    },
    mounted() {
    },
    methods: {
        onDateSelect(event) {
            if (event.target && event.target.value) {
                event = event.target.value
            }
            this.modelNode = getDateByTimezone(event, timeZoneUz)
            this.$emit('update:modelValue', this.modelNode)
        },
        onInputNumber(event) {
            let value = event.value
            if (this.$attrs.max && value > this.$attrs.max) {
                this.modelNode = value = this.$attrs.max
            }
            this.$emit('update:modelValue', value ? value : 0)
        },
        dropdownSelected(e) {
            return this.$emit('update:modelValue', e.value.id)
        },
        toDate(string) {
            return new Date(`01/01/1970 ${string}`)
        },
        convertToString(event) {
            let time = ''
            if (event.target && JSON.stringify(this.toDate(event.target.value)) !== "null") {
                time = event.target.value
            } else {
                this.modelNode = null
            }
            if (event instanceof Date) {
                this.modelNode = event
                time = timeFromDate(event)
            }
            this.$emit('update:modelValue', time)
        },

    }
}
</script>