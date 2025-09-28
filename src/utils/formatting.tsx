import { OptionInterface } from "@/types/optionInterface";

const Formatting = {
  formatRCFull: function (dataJson: any, keyValue: any, keyLabel: string) {
    let tempArray = [...dataJson];
    if (tempArray) {
      tempArray?.forEach((item) => {
        item.label = item[keyLabel];
        item.value = item[keyValue];
      });
    }
    return tempArray;
  },

  formatRCFullDouble: function (dataJson: any, keyValue: any, keyLabel1: string, keyLabel2: string) {
    let tempArray = [...dataJson];
    if (tempArray) {
      tempArray?.forEach((item) => {
        item.label = `${item[keyLabel1]} - ${item[keyLabel2]}`;
        item.value = item[keyValue];
      });
    }
    return tempArray;
  },

  formatRC: function (dataJson: any, keyValue: any, keyLabel: string) {
    let tempJobs: OptionInterface[] = [];
    if (dataJson) {
      dataJson?.forEach((v: any) => {
        tempJobs.push({
          label: v[keyLabel],
          value: v[keyValue],
        });
      });
    }
    return tempJobs;
  },

  formatRCDouble: function (dataJson: any, keyValue: any, keyLabel1: string, keyLabel2: string) {
    let tempJobs: OptionInterface[] = [];
    if (dataJson) {
      dataJson.forEach((v: any) => {
        tempJobs.push({
          label: `${v[keyLabel1]} - ${v[keyLabel2]}`,
          value: v[keyValue],
        });
      });
    }
    return tempJobs;
  },
};

export default Formatting;
