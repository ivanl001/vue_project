import Mock from "mockjs";
import homeApi from "./home";

Mock.setup({
  timeout: "200-2000"
});

Mock.mock(/\/home\/getStatisticalData/, "get", homeApi.getStatisticalData());
