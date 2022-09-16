import { ExcelUtility } from "./ExcelUtility.ts";
import { CellFill, IgrExcelModule } from "igniteui-react-excel";
import { Workbook } from "igniteui-react-excel";
import { Worksheet } from "igniteui-react-excel";
import { WorkbookFormat } from "igniteui-react-excel";
import { Color } from "igniteui-react-core";
import moment from "moment";
import { WorkbookColorInfo } from "igniteui-react-excel";
import { HorizontalCellAlignment } from "igniteui-react-excel";

IgrExcelModule.register();

export class ExcelLibraryWorkingWithCells {
  public canSave = false;
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
    SheetOne.rows(1).setCellValue(6, "Report Date");
    SheetOne.rows(1).setCellValue(7, ReportDate);

    //Row 2
    SheetOne.mergedCellsRegions().add(2, 3, 2, 7);
    SheetOne.rows(2).setCellValue(
      3,
      "Summary of Effort Metrics for " +
      FileName.replace("_", "-").replaceAll("-", "/")
    );
    SheetOne.rows(1).cells(3).cellFormat.font.bold = true;
    SheetOne.rows(1).cells(3).cellFormat.font.height = 22;

    SheetOne.rows(1).cells(6).cellFormat.bottomBorderStyle = 1;
    SheetOne.rows(1).cells(6).cellFormat.leftBorderStyle = 1;
    SheetOne.rows(1).cells(6).cellFormat.topBorderStyle = 1;
    SheetOne.rows(1).cells(6).cellFormat.rightBorderStyle = 1;

    SheetOne.rows(1)
      .cells(7)
      .cellFormat.setFormatting(SheetOne.rows(1).cells(6).cellFormat);

    var broderRow = [2, 3, 4, 5, 8, 9];
    var broderCell = [3, 4, 5, 6, 7];
    for (let row = 0; row < broderRow.length; row++) {
      for (let cell = 0; cell < broderCell.length; cell++) {
        SheetOne.rows(broderRow[row])
          .cells(broderCell[cell])
          .cellFormat.setFormatting(SheetOne.rows(1).cells(6).cellFormat);
      }
    }

    SheetOne.rows(2).cells(5).cellFormat.alignment =
      HorizontalCellAlignment.Center;

    SheetOne.rows(2).cells(5).cellFormat.fill =
      CellFill.createSolidFill("#f79c59");

    var color = new Color();
    color.colorString = "#fff";
    SheetOne.rows(2).cells(5).cellFormat.font.colorInfo = new WorkbookColorInfo(
      color
    );

    //Row 3
    SheetOne.rows(3).setCellValue(3, "No of Billable Days");
    SheetOne.rows(3).setCellValue(4, WorkingDaysCount);
    SheetOne.rows(3).setCellValue(5, "No of Billable Hours");
    SheetOne.rows(3).cells(6).applyFormula("=E4*8");

    //Row 4
    SheetOne.rows(4).setCellValue(3, "MTD Days Passed");
    SheetOne.rows(4).setCellValue(
      4,
      parseInt(WorkingDaysCount) - parseInt(detailsRow[0]["EmpLeaveCount"])
    );
    SheetOne.rows(4).setCellValue(5, "MTD Expected Hours");
    SheetOne.rows(4).cells(6).applyFormula("=E5*8");

    //Row 5
    SheetOne.rows(5).setCellValue(3, "No. Of Leaves");
    SheetOne.rows(5).setCellValue(4, parseInt(detailsRow[0]["EmpLeaveCount"]));
    SheetOne.rows(5).setCellValue(5, "Min MTD Expected Hours");
    SheetOne.rows(5).cells(6).applyFormula("=(E5-E6)*8");

    const SheetOneColumns = [
      "Emp Id",
      "Emp Name",
      "Effort Metrics Hours",
      "Deficit/Surplus as of Date",
      "Deficit for the Month",
    ];
    for (let col = 0; col < SheetOneColumns.length; col++) {
      SheetOne.columns(col + 3).width = 6000;
      SheetOne.rows(8).setCellValue(col + 3, SheetOneColumns[col]);
      SheetOne.rows(8).cells(col + 3).cellFormat.fill =
        CellFill.createSolidFill("#f79c59");

      SheetOne.rows(8).cells(col + 3).cellFormat.font.colorInfo =
        new WorkbookColorInfo(color);
    }

    const SheetRow: any = [
      parseInt(detailsRow[0]["EmpId"]),
      detailsRow[0]["FirstName"] + " " + detailsRow[0]["LastName"],
      "=(" + detailsRow[0]["FirstName"] + "!D1)",
      "=$F$10-$G$5",
      "=$F$10-$G$4",
    ];
    for (let col = 0; col < SheetRow.length; col++) {
      if (col <= 2) {
        SheetOne.columns(col + 3).width = 5000;
        SheetOne.rows(9).setCellValue(col + 3, SheetRow[col]);
      } else if (col !== 2) {
        SheetOne.rows(9)
          .cells(col + 3)
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
      .applyFormula("=SUM(G3:G" + (TimeSheetDatas.length + 2) + ")");
    const SheetTwoColumns = [
      "Date",
      "Status",
      "Project",
      "Description",
      "Actual / Estimated completion Date",
      "Objects Changed",
      "Hours",
    ];

    // var color = new Color();
    color.colorString = "#fff";
    for (let col = 0; col < SheetTwoColumns.length; col++) {
      if (col === 3) SheetTwo.columns(col).width = 8000;
      else SheetTwo.columns(col).width = 4000;

      SheetTwo.rows(1).setCellValue(col, SheetTwoColumns[col]);

      SheetTwo.rows(1).cells(col).cellFormat.fill =
        CellFill.createSolidFill("#387dc2");

      SheetTwo.rows(1).cells(col).cellFormat.font.colorInfo =
        new WorkbookColorInfo(color);
    }

    // let expanseCol = 0;
    // for (const key of SheetTwoColumns) {
    //   SheetTwo.columns(expanseCol).width = 5000;
    //   SheetTwo.rows(1).setCellValue(expanseCol, key);
    //   SheetTwo.rows(1).cells(expanseCol).cellFormat.fill =
    //     CellFill.createSolidFill("#f79c59");
    //   expanseCol++;
    // }

    for (let col = 0; col < TimeSheetDatas.length; col++) {
      let rowData = TimeSheetDatas[col];
      SheetTwo.rows(col + 2).setCellValue(0, rowData["TaskDate"]);
      SheetTwo.rows(col + 2).setCellValue(1, rowData["Status"]);
      SheetTwo.rows(col + 2).setCellValue(2, rowData["ProjectName"]);
      SheetTwo.rows(col + 2).setCellValue(3, rowData["TaskDescription"]);
      SheetTwo.rows(col + 2).cells(3).cellFormat.wrapText = true;
      SheetTwo.rows(col + 2).setCellValue(4, "");
      SheetTwo.rows(col + 2).setCellValue(5, rowData["Object"]);
      SheetTwo.rows(col + 2).setCellValue(6, rowData["Hours"]);
    }
    // Here, set Effort Metrics Hours formula after SheetTwo is Ready...
    try {
      SheetOne.rows(9).cells(5).applyFormula(SheetRow[2].toString());
    } catch (error) {
      alert(error);
    }

    this.workbookParse(wb);
    this.workbookSave(FileName);
  }
}
