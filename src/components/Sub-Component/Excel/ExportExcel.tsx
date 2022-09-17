import { ExcelUtility } from "./ExcelUtility.ts";
import { CellFill, IgrExcelModule } from "igniteui-react-excel";
import { Workbook } from "igniteui-react-excel";
import { Worksheet } from "igniteui-react-excel";
import { WorkbookFormat } from "igniteui-react-excel";
import { Color } from "igniteui-react-core";
import moment from "moment";
import { WorkbookColorInfo } from "igniteui-react-excel";
import { HorizontalCellAlignment } from "igniteui-react-excel";
import { useAlert } from "react-alert";

IgrExcelModule.register();

export class ExcelLibraryWorkingWithCells {
  public canSave = false;
  public alert :any= useAlert();
  public wb: Workbook;
  public ws: Worksheet;
  public worksheetRegion: string[] | null;
  public selectedRegion: string | null;
  public cellFeatures: string[];
  static worksheetRegion: string[] | null;
  static selectedRegion: string | null;
  static wb: Workbook;
  static canSave: boolean;

  public static workbookSave(FileName: string): void {
    if (this.canSave) {
      ExcelUtility.save(this.wb, FileName).then(
        (f: any) => {
          console.log("Saved:" + f);
          setTimeout(() => {
            alert.success('File Downloaded Successfully.');
          }, 500);
        },
        (e: any) => {
          console.error("ExcelUtility.Save Error:" + e);
        }
      );
    }
  }
  public static workbookParse(wb: Workbook): void {
    if (wb === undefined) {
      this.worksheetRegion = null;
      this.selectedRegion = null;
    } else {
      const names = new Array<string>();
      const worksheets = wb.worksheets();
      const wsCount = worksheets.count;
      //   alert(wsCount);
      for (let i = 0; i < wsCount; i++) {
        const tables = worksheets.item(i).tables();
        const tCount = tables.count;
        for (let j = 0; j < tCount; j++) {
          names.push(worksheets.item(i).name + " - " + tables.item(j).name);
        }
      }
      this.worksheetRegion = names;
      this.selectedRegion = names.length > 0 ? names[0] : null;
    }
    this.wb = wb;
    this.canSave = wb != null;
  }

  public static workbookCreate(
    TimeSheetDatas: any,
    WorkingDaysCount: any,
    detailsRow: any,
    FileName: any
  ): void {

    const wb = new Workbook(WorkbookFormat.Excel2007);
    // const monthYear = new Date().toLocaleDateString("en-us", {
    //   year: "numeric",
    //   month: "short",
    // });
    const ReportDate = moment(new Date()).format("DD-MM-YYYY");
    const SheetOne = wb.worksheets().add(FileName); //WorkSheet Name

    //Row 1
    SheetOne.rows(6).setCellValue(8, "Report Date");
    SheetOne.rows(6).setCellValue(9, ReportDate);
    SheetOne.rows(6).cells(8).cellFormat.font.bold=true;

    //Row 2
    SheetOne.mergedCellsRegions().add(7, 5, 7, 9);
    SheetOne.rows(7).setCellValue(
      5,
      "Summary of Effort Metrics for " +
      FileName.replace("_", "-")
    );
    //SheetOne.rows(6).cells(5).cellFormat.font.bold = true;

    SheetOne.rows(7).cells(5).cellFormat.bottomBorderStyle = 1;
    SheetOne.rows(7).cells(5).cellFormat.leftBorderStyle = 1;
    SheetOne.rows(7).cells(5).cellFormat.topBorderStyle = 1;
    SheetOne.rows(7).cells(5).cellFormat.rightBorderStyle = 1;

    SheetOne.rows(6)
      .cells(9)
      .cellFormat.setFormatting(SheetOne.rows(6).cells(8).cellFormat);

    var broderRow = [7,8,9,10,12,13];
    var broderCell = [ 5, 6, 7,8,9];
    for (let row = 0; row < broderRow.length; row++) {
      for (let cell = 0; cell < broderCell.length; cell++) {
        SheetOne.rows(broderRow[row])
          .cells(broderCell[cell])
          .cellFormat.setFormatting(SheetOne.rows(7).cells(5).cellFormat);
        if([7,12].indexOf(broderRow[row]) === -1){
                  SheetOne.rows(broderRow[row])
                  .cells(broderCell[cell]).cellFormat.fill =
                CellFill.createSolidFill("#dbe5f1");
              }
    }
    }

    SheetOne.rows(7).cells(5).cellFormat.alignment =
      HorizontalCellAlignment.Center;

    SheetOne.rows(7).cells(5).cellFormat.fill =
      CellFill.createSolidFill("#387dc2");

    var color = new Color();
    color.colorString = "#fff";
    SheetOne.rows(7).cells(5).cellFormat.font.colorInfo = new WorkbookColorInfo(
      color
    );

    //Row 3
    SheetOne.rows(8).setCellValue(5, "No of Billable Days");
    SheetOne.rows(8).setCellValue(6, WorkingDaysCount);
    SheetOne.rows(8).setCellValue(7, "No of Billable Hours");
    SheetOne.rows(8).cells(8).applyFormula("=G9*8");

    //Row 4
    SheetOne.rows(9).setCellValue(5, "MTD Days Passed");
    SheetOne.rows(9).setCellValue(
      6,
      parseInt(WorkingDaysCount) - parseInt(detailsRow[0]["EmpLeaveCount"])
    );
    SheetOne.rows(9).setCellValue(7, "MTD Expected Hours");
    SheetOne.rows(9).cells(8).applyFormula("=G10*8");

    //Row 5
    SheetOne.rows(10).setCellValue(5, "No. Of Leaves");
    SheetOne.rows(10).setCellValue(6, parseInt(detailsRow[0]["EmpLeaveCount"]));
    SheetOne.rows(10).setCellValue(7, "Min MTD Expected Hours");
    SheetOne.rows(10).cells(8).applyFormula("=(G10-G11)*8");

    const SheetOneColumns = [
      "Emp Id",
      "Emp Name",
      "Effort Metrics Hours",
      "Deficit/Surplus as of Date",
      "Deficit for the Month",
    ];
    for (let col = 0; col < SheetOneColumns.length; col++) {
      SheetOne.columns(col + 5).width = 6000;
      SheetOne.rows(12).setCellValue(col + 5, SheetOneColumns[col]);
      SheetOne.rows(12).cells(col + 5).cellFormat.fill =
        CellFill.createSolidFill("#387dc2");

      SheetOne.rows(12).cells(col + 5).cellFormat.font.colorInfo =
        new WorkbookColorInfo(color);
    }

    const SheetRow: any = [
      parseInt(detailsRow[0]["EmpId"]),
      detailsRow[0]["FirstName"] + " " + detailsRow[0]["LastName"],
      "=(" + detailsRow[0]["FirstName"] + "!D1)",
      "=$H$14-$I$10",
      "=$H$14-$I$9",
    ];
    for (let col = 0; col < SheetRow.length; col++) {
      if (col <= 2) {
        SheetOne.columns(col + 5).width = 5000;
        SheetOne.rows(13).setCellValue(col + 5, SheetRow[col]);
      } else if (col !== 2) {
        SheetOne.rows(13)
          .cells(col + 5)
          .applyFormula(SheetRow[col]);
      }
    }

    const SheetTwo: any = wb
      .worksheets()
      .add(detailsRow[0]["FirstName"].toString());
    SheetTwo.mergedCellsRegions().add(0, 0, 0, 2);
    SheetTwo.rows(0).setCellValue(0, "Effort Metrics Reported Thru Email");

    SheetTwo.rows(0)
    .cells(3)
    .applyFormula("=SUM(G4:G" + (TimeSheetDatas.length + 3) + ")");
    
    SheetTwo.rows(0).cells(0).cellFormat.font.bold=true;
    SheetTwo.rows(0).cells(3).cellFormat.font.bold=true;

    const SheetTwoColumns = [
      "Date",
      "Status",
      "Project",
      "Description",
      "Actual / Estimated completion Date",
      "Objects Changed",
      "Hours",
    ];

    SheetTwo.rows(2).cells(0).cellFormat.bottomBorderStyle = 1;
    SheetTwo.rows(2).cells(0).cellFormat.leftBorderStyle = 1;
    SheetTwo.rows(2).cells(0).cellFormat.topBorderStyle = 1;
    SheetTwo.rows(2).cells(0).cellFormat.rightBorderStyle = 1;

    // var color = new Color();
    color.colorString = "#fff";
    for (let col = 0; col < SheetTwoColumns.length; col++) {
      if (col === 3) SheetTwo.columns(col).width = 8000;
      else SheetTwo.columns(col).width = 4000;

      SheetTwo.rows(2).setCellValue(col, SheetTwoColumns[col]);

      SheetTwo.rows(2).cells(col).cellFormat.fill =
        CellFill.createSolidFill("#387dc2");

      SheetTwo.rows(2).cells(col).cellFormat.font.colorInfo =
        new WorkbookColorInfo(color);

        SheetTwo.rows(2).cells(col).cellFormat.setFormatting(SheetTwo.rows(2).cells(0).cellFormat);
    }

    // let expanseCol = 0;
    // for (const key of SheetTwoColumns) {
    //   SheetTwo.columns(expanseCol).width = 5000;
    //   SheetTwo.rows(1).setCellValue(expanseCol, key);
    //   SheetTwo.rows(1).cells(expanseCol).cellFormat.fill =
    //     CellFill.createSolidFill("#387dc2");
    //   expanseCol++;
    // }
    SheetTwo.rows(3).cells(0).cellFormat.bottomBorderStyle = 1;
    SheetTwo.rows(3).cells(0).cellFormat.leftBorderStyle = 1;
    SheetTwo.rows(3).cells(0).cellFormat.topBorderStyle = 1;
    SheetTwo.rows(3).cells(0).cellFormat.rightBorderStyle = 1;

    for (let col = 0; col < TimeSheetDatas.length; col++) {
      let rowData = TimeSheetDatas[col];
      SheetTwo.rows(col + 3).setCellValue(0, rowData["TaskDate"]);
      SheetTwo.rows(col + 3).setCellValue(1, rowData["Status"]);
      SheetTwo.rows(col + 3).setCellValue(2, rowData["ProjectName"]);
      SheetTwo.rows(col + 3).setCellValue(3, rowData["TaskDescription"]);
      SheetTwo.rows(col + 3).cells(3).cellFormat.wrapText = true;
      SheetTwo.rows(col + 3).setCellValue(4, "");
      SheetTwo.rows(col + 3).setCellValue(5, rowData["Object"]);
      SheetTwo.rows(col + 3).setCellValue(6, rowData["Hours"]);

      SheetTwo.rows(col + 3).cells(0).cellFormat.setFormatting(SheetTwo.rows(3).cells(0).cellFormat);
      SheetTwo.rows(col + 3).cells(1).cellFormat.setFormatting(SheetTwo.rows(3).cells(0).cellFormat);
      SheetTwo.rows(col + 3).cells(2).cellFormat.setFormatting(SheetTwo.rows(3).cells(0).cellFormat);
      SheetTwo.rows(col + 3).cells(3).cellFormat.setFormatting(SheetTwo.rows(3).cells(0).cellFormat);
      SheetTwo.rows(col + 3).cells(4).cellFormat.setFormatting(SheetTwo.rows(3).cells(0).cellFormat);
      SheetTwo.rows(col + 3).cells(5).cellFormat.setFormatting(SheetTwo.rows(3).cells(0).cellFormat);
      SheetTwo.rows(col + 3).cells(6).cellFormat.setFormatting(SheetTwo.rows(3).cells(0).cellFormat);
    }
    //Here, set Effort Metrics Hours formula after SheetTwo is Ready...
    try {
      SheetOne.rows(13).cells(7).applyFormula(SheetRow[2].toString());
      SheetOne.rows(13).cells(7).cellFormat.font.bold=true;
    } catch (error) {
      alert(error);
    }

    this.workbookParse(wb);
    this.workbookSave(FileName);
  }
}
