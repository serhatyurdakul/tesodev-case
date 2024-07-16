if (!localStorage.getItem("combinedData")) {
  fetch("../../data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      const combinedData = jsonData.data.map((row) => {
        const rowData = {};
        for (let i = 0; i < jsonData.cols.length; i++) {
          rowData[jsonData.cols[i]] = row[i];
        }
        return rowData;
      });

      const combinedDataString = JSON.stringify(combinedData);
      localStorage.setItem("combinedData", combinedDataString);

      window.location.reload();
    })
    .catch((error) => console.error(error));
}
