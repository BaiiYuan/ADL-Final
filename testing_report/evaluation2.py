from options import test_options
from dataloader import data_loader
from model import create_model
from itertools import islice
from IPython import embed
import torchvision.utils as vutils
import os
import torch

image = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
image_root = './groundtruths/360'

def denormalize(x):
    return x.add_(1).mul_(0.5)


def normalize(x):
    return x.mul_(2).add_(-1)

def save_img_test(input_imgs, fname='test.png'):
    vutils.save_image(denormalize(input_imgs).data, fname,  nrow=9)
    # vutils.save_image(denormalize(input_imgs).data, 'test.png')

class Pluralistic_Inpainting_Model():
    def __init__(self):
        self.opt = test_options.TestOptions().parse()
        self.model = create_model(self.opt)
        self.model.eval()

    def paint(self, img_file, save_path, nsampling):
        for c, img in enumerate(image):
            save = []
            img_file = os.path.join(image_root, img)
            for mask_width in [16, 32, 48, 64]:

                dataset = data_loader.dataloader(self.opt, img_file, mask_width=mask_width)
                for i, data in enumerate(islice(dataset, self.opt.how_many)):
                    self.model.set_input(data)
                    out = [(normalize(data['img'])*data['mask']).cuda()]
                    out.extend(self.model.test(save_path, nsampling))

                    save.extend(out)
            # embed()
            save_img_test(torch.cat(save), f"pretrained_task2_img{c}.png")

if __name__ == '__main__':
    pluralistic_model = Pluralistic_Inpainting_Model()
    # for function input
    img_file = pluralistic_model.opt.img_file
    save_path = pluralistic_model.opt.results_dir
    nsampling = pluralistic_model.opt.nsampling
    print(img_file, save_path, nsampling)

    pluralistic_model.paint(img_file, save_path, nsampling)

    embed()
