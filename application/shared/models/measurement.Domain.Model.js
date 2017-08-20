class MeasurementDomainModel {
    constructor() {
        this.id = null;
        this.lightElectricalQuantity = null;
        this.lightIntensity = null;
        this.createdDateTime = null;
        this.modifiedDateTime = null;
    }

    static fromGetApiModel(measurementGetApiModel) {
        let measurementDomainModel = new MeasurementDomainModel();
        measurementDomainModel.id = measurementGetApiModel.id;
        measurementDomainModel.lightElectricalQuantity = measurementGetApiModel.lightElectricalQuantity;
        measurementDomainModel.lightIntensity = measurementGetApiModel.lightIntensity;
        measurementDomainModel.createdDateTime = new Date(measurementGetApiModel.createdDateTime);
        measurementDomainModel.modifiedDateTime = new Date(measurementGetApiModel.modifiedDateTime);
        measurementDomainModel = GenericObjectHelper.sanitizeNullProperties(measurementDomainModel);
        return measurementDomainModel;
    }

    static fromGetApiModels(measurementGetApiModels) {

        let measurementDomainModels = [];

        /** mgami - stands for measurementGetApiModels Iterator*/
        for (let tgami = 0; tgami < measurementGetApiModels.length; tgami++) {
            measurementDomainModels.push(MeasurementDomainModel.fromGetApiModel(measurementGetApiModels[tgami]));
        }

        return measurementDomainModels;
    }
}