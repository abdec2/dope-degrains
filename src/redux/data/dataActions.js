// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();
      let public_cost = await store
        .getState()
        .blockchain.smartContract.methods.cost()
        .call();

      let presale_cost = await store
        .getState()
        .blockchain.smartContract.methods.presale_price()
        .call();

      let presale = await store
        .getState()
        .blockchain.smartContract.methods.presale()
        .call();
      
      let maxSupply = await store
        .getState()
        .blockchain.smartContract.methods._maxSupply()
        .call();

      let cost = presale ? presale_cost : public_cost

      dispatch(
        fetchDataSuccess({
          totalSupply,
          cost,
          maxSupply
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
