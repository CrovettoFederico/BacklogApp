using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBModel.Models {
    public class Task {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? FinishedAt { get; set; }
        public DateTime? Deadline { get; set; }
        public bool IsFinished { get; set; }
        public bool isDeleted { get; set; }
        public int UserId { get; set; }

        [ForeignKey("Id")]
        public virtual User User { get; set; }

    }
}
