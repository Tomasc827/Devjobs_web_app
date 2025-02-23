package lt.TomasC.Devjobs_web_app.controller;


import jakarta.validation.Valid;
import lt.TomasC.Devjobs_web_app.dto.job_ad.JobAdMapper;
import lt.TomasC.Devjobs_web_app.dto.job_ad.JobAdRequestDTO;
import lt.TomasC.Devjobs_web_app.dto.job_ad.JobAdResponseDTO;
import lt.TomasC.Devjobs_web_app.model.EmploymentType;
import lt.TomasC.Devjobs_web_app.model.Location;
import lt.TomasC.Devjobs_web_app.service.JobAdService;
import lt.TomasC.Devjobs_web_app.util.WebUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobAdController {
    private final JobAdService jobAdService;

    public JobAdController(JobAdService jobAdService) {
        this.jobAdService = jobAdService;
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_COMPANY')")
    public ResponseEntity<JobAdResponseDTO> createJobAd(@Valid @RequestBody JobAdRequestDTO dto) {
        JobAdResponseDTO responseDTO = jobAdService.createJobAd(dto);
        URI location = WebUtil.createLocation("/{id}", responseDTO.id());
        return ResponseEntity.created(location).body(responseDTO);
    }
    @GetMapping("/search")
    public ResponseEntity<Page<JobAdResponseDTO>> getAllJobAdsSearchPages(@RequestParam(required = false) Location location,
                                                                          @RequestParam(defaultValue = "postedAt") String sortBy,
                                                                          @RequestParam(defaultValue = "desc") String direction,
                                                                          @RequestParam(defaultValue = "0") int page,
                                                                          @RequestParam(defaultValue = "4") int size,
                                                                          @RequestParam(required = false) String position,
                                                                          @RequestParam(required = false) EmploymentType employmentType
                                                                          ) {
        Pageable pageable = PageRequest.of(page,size,direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC :
                Sort.Direction.ASC,sortBy);
        return ResponseEntity.ok(jobAdService.getPagedJobsParameters(position,location,employmentType,pageable));
    }

    @GetMapping("/all")
    public ResponseEntity<Page<JobAdResponseDTO>> getAllJobAds(@RequestParam(defaultValue = "postedAt") String sortBy,
                                                               @RequestParam(defaultValue = "asc") String direction,
                                                               @RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "4") int size) {
        Pageable pageable = PageRequest.of(page,size,direction.equalsIgnoreCase("asc") ? Sort.Direction.ASC :
                Sort.Direction.DESC,sortBy);
        return ResponseEntity.ok(jobAdService.findAllJobs(pageable));
    }

    @GetMapping("/locations")
    public ResponseEntity<List<String>> getAllLocations() {
        return ResponseEntity.ok().body(jobAdService.getAllLocations());
    }

}
