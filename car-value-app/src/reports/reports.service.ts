import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";
import { CreateReportDto } from "./dtos/create-report.dto";
import { GetEstimateDto } from "./dtos/get-estimate.dto";
import { Report } from "./report.entity";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(createReportDto: CreateReportDto, user: User) {
    const report = this.repo.create(createReportDto);
    report.user = user;

    return this.repo.save(report);
  }

  async changeReportApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id } });

    if (!report) {
      throw new NotFoundException("report not found");
    }

    report.approved = approved;
    return this.repo.save(report);
  }

  async createEstimate({
    make,
    model,
    lng,
    lat,
    year,
    mileage,
  }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select("AVG(price)", "price")
      .where("LOWER(make) = LOWER(:make)", { make })
      .andWhere("LOWER(model) = LOWER(:model)", { model })
      .andWhere("lng - :lng BETWEEN -5 AND 5", { lng })
      .andWhere("lat - :lat BETWEEN -5 AND 5", { lat })
      .andWhere("year - :year BETWEEN -3 AND 3", { year })
      .andWhere("approved IS TRUE")
      .orderBy("ABS(mileage - :mileage)", "DESC")
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
