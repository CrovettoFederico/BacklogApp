using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBModel.Models {
    public class User {

        [Key]
        public int Id { get; set; }


        public ICollection<Task> Tasks { get; set; }
    }
}
