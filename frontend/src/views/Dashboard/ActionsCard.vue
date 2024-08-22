<script setup lang="ts">
import { api } from '@/api';
import { useModal } from '@/composables/useModal';
import { useToast } from '@/composables/useToast';
import { ref } from 'vue';
const modal = useModal<boolean>();
const toast = useToast();

const formData = ref({
  applicantName: '',
  applicantEmail: '',
  applicantMobilePhoneNumber: '',
  applicantAddress: '',
  annualIncomeBeforeTax: 0,
  incomingAddress: '',
  incomingDeposit: 0,
  incomingPrice: 0,
  incomingStampDuty: 0,
  loanAmount: 0,
  loanDuration: 0,
  monthlyExpenses: 0,
  outgoingAddress: '',
  outgoingMortgage: 0,
  outgoingValuation: 0,
  savingsContribution: 0,
});
const formRef = ref<HTMLFormElement | null>(null);


const submitApplication = async () => {
  const response = await api.applications.post(formData.value);
  if (response.success) toast.success('Application Saved Successfully.');
  else {
    toast.error('Error occurred while saving application');
    formData.value.applicantName = '';
    formData.value.applicantEmail = '';
    formData.value.applicantMobilePhoneNumber = '';
    formData.value.applicantAddress = '';
    formData.value.annualIncomeBeforeTax = 0;
    formData.value.incomingAddress = '';
    formData.value.incomingDeposit = 0;
    formData.value.incomingPrice = 0;
    formData.value.incomingStampDuty = 0;
    formData.value.loanAmount = 0;
    formData.value.loanDuration = 0;
    formData.value.monthlyExpenses = 0;
    formData.value.outgoingAddress = '';
    formData.value.outgoingMortgage = 0;
    formData.value.outgoingValuation = 0;
    formData.value.savingsContribution = 0;
  }
  modal.confirm(false);
};
const clicker = () => {
if (formRef.value) {
    formRef.value.requestSubmit(); 
  }
};


</script>

<template>
  <div class="action-section">
    <BCard align-title="center" align-footer="center" align-content="center">
      <template #title>Submit loan application</template>
      <BSvgIcon name="dashboard-loan" />
      <template #footer>
        <BButton variant="primary" label="Submit application" icon-pos="right" icon="pi pi-chevron-right"
          @click="modal.showModal()" />
      </template>
    </BCard>

    <BModal :visible="modal.isVisible.value" :confirm="modal.confirm" @hide="modal.confirm(false)">
      <template #header>Submit loan application</template>

      <form ref="formRef" @submit.prevent="submitApplication()">
        <!-- Need to change with v-for after change state with object -->
        <div class="inputThing">

          <div>

            <label for="applicant_name">Name</label>
            <BTextInput v-model="formData.applicantName" id="applicant_name" type="text" required />
          </div>

          <div>
            <label for="applicant_email">Email</label>
            <BTextInput v-model="formData.applicantEmail" id="applicant_email" type="email" required />
          </div>
          <div>
            <label for="applicant_mobile_phone_number">Mobile Phone Number</label>
            <BTextInput v-model="formData.applicantMobilePhoneNumber" id="applicant_mobile_phone_number" type="tel"
              required />
          </div>

          <div>
            <label for="applicant_address">Applicant Address</label>
            <BTextInput v-model="formData.applicantAddress" id="applicant_address" required />
          </div>

          <div>
            <label for="annual_income_before_tax">Annual Income Before Tax</label>
            <BNumberInput v-model="formData.annualIncomeBeforeTax" id="annual_income_before_tax" required />
          </div>
          <div>
            <label for="incoming_address">Incoming Address</label>
            <BTextInput v-model="formData.incomingAddress" id="incoming_address" required />
          </div>

          <div>
            <label for="incoming_deposit">Incoming deposit</label>
            <BNumberInput v-model="formData.incomingDeposit" id="incoming_deposit" required />
          </div>


          <div>
            <label for="incoming_price">Incoming Price</label>
            <BNumberInput v-model="formData.incomingPrice" id="incoming_price" required />
          </div>

          <div>
            <label for="incoming_stamp_duty">Incoming Stamp Duty</label>
            <BNumberInput v-model="formData.incomingStampDuty" id="incoming_stamp_duty" required />
          </div>

          <div>
            <label for="loan_amount">Loan Amount</label>
            <BNumberInput v-model="formData.loanAmount" id="loan_amount" required />
          </div>

          <div>
            <label for="loan_duration">Loan Duration</label>
            <BNumberInput v-model="formData.loanDuration" id="loan_duration" required />
          </div>

          <div>
            <label for="monthly_expenses">Monthly Expenses</label>
            <BNumberInput v-model="formData.monthlyExpenses" id="monthly_expenses" required />
          </div>

          <div>
            <label for="outgoing_address">Outgoing Address</label>
            <BTextInput v-model="formData.outgoingAddress" id="outgoing_address" required />
          </div>

          <div>
            <label for="outgoing_mortgage">Outgoing Mortgage</label>
            <BNumberInput v-model="formData.outgoingMortgage" id="outgoing_mortgage" required />
          </div>
          <div>
            <label for="outgoing_valuation">Outgoing Valuation</label>
            <BNumberInput v-model="formData.outgoingValuation" id="outgoing_valuation" required />
          </div>
          <div>
            <label for="savings_contribution">Savings Contribution</label>
            <BNumberInput v-model="formData.savingsContribution" id="savings_contribution" required />
          </div>
          <BButton type="submit" variant="primary" label="Submit" style="display: none;"></BButton>
        </div>

      </form>
      <template #footer>
        <BButton type="button" variant="primary" label="Submit" @click="clicker()"></BButton>
        <BButton label="Cancel" @click="modal.confirm(false)"></BButton>
      </template>
    </BModal>
  </div>
</template>

<style lang="scss" scoped>
.action-section {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  align-items: stretch;
  container-type: inline-size;

  >* {
    flex: 1 1 100%;
  }

  @container (min-width: 900px) {
    >* {
      flex: 1 1 calc((100% - 2rem) / 3);
    }
  }
}

.b-card {
  height: 100%;
}

.b-icon {
  width: 5rem;
  height: 5rem;
}
.inputThing {
  display: grid;
  gap: 3rem;
  padding: 2rem;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 768px) {
  .inputThing {
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .inputThing {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
