from options import test_options
from dataloader import data_loader
from model import create_model
from itertools import islice
from IPython import embed

class Pluralistic_Inpainting_Model():
    def __init__(self):
        self.opt = test_options.TestOptions().parse()
        self.model = create_model(self.opt)
        self.model.eval()

    def paint(self, img_file, save_path, nsampling):
        dataset = data_loader.dataloader(self.opt, img_file)
        for i, data in enumerate(islice(dataset, self.opt.how_many)):
            self.model.set_input(data)
            self.model.test(save_path, nsampling)

if __name__ == '__main__':
    pluralistic_model = Pluralistic_Inpainting_Model()

    # for function input
    img_file = pluralistic_model.opt.img_file
    save_path = pluralistic_model.opt.results_dir
    nsampling = pluralistic_model.opt.nsampling
    print(img_file, save_path, nsampling)

    pluralistic_model.paint(img_file, save_path, nsampling)

    embed()
