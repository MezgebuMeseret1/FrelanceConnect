import ContractDetails from "./pages/ContractDetails";
import MyContracts from "./pages/MyContracts";

const contractRoutes = [
  {
    path: "/contracts",
    element: <MyContracts />,
  },
  {
    path: "/contracts/:id",
    element: <ContractDetails />,
  },
];


export default contractRoutes;