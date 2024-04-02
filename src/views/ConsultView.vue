<template>
    <div class="background">
        <div class="container">
        <div class="text-center header1">链上动态策略分析模型</div>
        <el-button-group>
            <el-button @click="changeMode(1)" type="primary" :icon="ArrowLeft">融资租赁</el-button>
            <el-button @click="changeMode(0)" type="primary">节能及碳补贴
                <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
        </el-button-group>
    <br>
    <br>
    <el-form :inline="true" class="queryhash">
        <el-form-item>
            <el-input class="queryform" v-model="machine_num" placeholder="请输入洗衣机数量" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="calculate">计算</el-button>
        </el-form-item>
    </el-form>
    <div class="card title1" v-if="financial">
        <h1 class="text-center head2">融资租赁信用评估数据</h1>
        <div class="row">
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-danger text-white">
                        <h3 class="card-title">月折旧</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{ monthly_depreciation_cost}}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-danger text-white">
                        <h3 class="card-title">维修工人工资</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{repairman_salary_cost }}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-warning text-white">
                        <h3 class="card-title">管理人员工资</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{manager_salary_cost }}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-warning text-white">
                        <h3 class="card-title">平台费用</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{platform_fee_cost }}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-info text-white">
                        <h3 class="card-title">洗衣机月租金</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{ machine_rent_cost }}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-info text-white">
                        <h3 class="card-title">维修费用</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{repair_cost }}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h3 class="card-title">水电费</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{utility_cost }}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h3 class="card-title">总收入</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{total_income }}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-secondary text-white">
                        <h3 class="card-title">营业税</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{business_tax }}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-secondary text-white">
                        <h3 class="card-title">总成本</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{total_cost }}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-success text-white">
                        <h3 class="card-title">利润</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{profit }}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-success text-white">
                        <h3 class="card-title">净利润</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{net_profit}}元</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card title1" v-else>
        <h1 class="text-center head2">洗衣机节能及碳补贴数据</h1>
        <div class="row">
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-success text-white">
                        <h3 class="card-title">每日节省能耗</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{ carbon_compensation}}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-success text-white">
                        <h3 class="card-title">每日获得碳补贴</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{ energy_savings}}元</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-secondary text-white">
                        <h3 class="card-title">每日洗衣总次数</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{ Total_perday}}次</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-secondary text-white">
                        <h3 class="card-title">洗衣机数量</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{ machine_nums}}台</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h3 class="card-title">可扩充计算项目</h3>
                    </div>
                    <div class="card-body">
                        <h2 class="text-center">{{ totalIncome}}元</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>
  
  <script>
  import { ref } from 'vue';
  import $ from 'jquery';
  import {
    ArrowLeft,
    ArrowRight,
    Search,
    } from '@element-plus/icons-vue'
  export default {
    name: "ConsultView",
    components:{

    },
    setup() {
        let financial = ref('')
        let totalIncome = ref('')
        let machine_num = ref('');
        let monthly_depreciation_cost = ref('');
        let repairman_salary_cost = ref('');
        let manager_salary_cost = ref('');
        let platform_fee_cost = ref('');
        let machine_rent_cost = ref('');
        let repair_cost = ref('');
        let utility_cost = ref('');
        let total_income = ref('');
        let business_tax = ref('');
        let total_cost = ref('');
        let profit = ref('');
        let net_profit = ref('');
        let energy_savings = ref('');
        let carbon_compensation = ref('');
        let Total_perday = ref('');
        let machine_nums = ref('');
        financial.value = 1;
        totalIncome.value = 0;
        const changeMode = value => {
            if(financial.value != value){
                financial.value = value;
            }
        }

        const calculate = () =>{
            if(financial.value == true){
                $.ajax({
                    url: "http://43.138.30.253:8000/myspace/financial/",
                    type: "GET",
                     data:{
                        "method": machine_num.value,
                    },
                    success(resp){
                        console.log(resp);
                        monthly_depreciation_cost.value = resp.data.monthly_depreciation_cost;
                        repairman_salary_cost.value = resp.data.repairman_salary_cost;
                        manager_salary_cost.value = resp.data.manager_salary_cost;
                        platform_fee_cost.value = resp.data.platform_fee_cost;
                        machine_rent_cost.value = resp.data.machine_rent_cost;
                        repair_cost.value = resp.data.repair_cost;
                        utility_cost.value = resp.data.utility_cost;
                        total_income.value = resp.data.total_income;
                        business_tax.value = resp.data.business_tax;
                        total_cost.value = resp.data.total_cost;
                        profit.value = resp.data.profit;
                        net_profit.value = resp.data.net_profit;
                    }
                })
            }
            else{
                $.ajax({
                    url: "http://43.138.30.253:8000/myspace/savings/",
                    type: "GET",
                     data:{
                        "method": machine_num.value,
                    },
                    success(resp){
                        energy_savings.value = resp.data.energy_savings;
                        carbon_compensation.value = resp.data.carbon_compensation;
                        Total_perday.value = resp.data.Total_perday;
                        machine_nums.value = resp.data.machine_nums;
                        console.log(resp.data.energy_savings);
                    }
                })
            }
        }
      return {
        net_profit,
        profit,
        total_cost,
        business_tax,
        total_income,
        utility_cost,
        repair_cost,
        machine_rent_cost,
        platform_fee_cost,
        machine_nums,
        Total_perday,
        carbon_compensation,
        energy_savings,
        monthly_depreciation_cost,
        repairman_salary_cost,
        manager_salary_cost,
        machine_num,
        changeMode,
        totalIncome,
        financial,
        calculate,
        ArrowLeft,
        ArrowRight,
        Search,
      };
    },
  };
  </script>
  
  <style scoped>
  .card {
    border-radius: 1rem;
    background-color: lightcyan;
  }

  
  .head2{
    margin-top: 0;
  }

  .header1{
    font-size: 3em;
    font-style: normal;
    color: aliceblue;
  }

  .background {
  background:url("../img/background.jpeg");
  width:100%;
  height:100%;
  position:relative;
  background-size:100% 100%;
}
  </style>