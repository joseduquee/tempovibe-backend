import { Injectable } from '@nestjs/common';
import { CreateTimeTrackingInput, UpdateTimeTrackingInput } from '../graphql/dto/inputs';

@Injectable()
export class TimeTrackingService {
  create(createTimeTrackingInput: CreateTimeTrackingInput) {
    return 'This action adds a new timeTracking';
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} timeTracking`;
  }

  update(id: number, updateTimeTrackingInput: UpdateTimeTrackingInput) {
    return `This action updates a #${id} timeTracking`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeTracking`;
  }
}
